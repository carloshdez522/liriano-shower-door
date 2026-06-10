<?php
require_once __DIR__ . '/../config.php';

sendSecurityHeaders();
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

function sessionCookie() {
  session_set_cookie_params([
    'lifetime' => 0, 'path' => '/', 'secure' => IS_HTTPS, 'httponly' => true, 'samesite' => 'Lax',
  ]);
}

$method = $_SERVER['REQUEST_METHOD'];

/* ===== Rate limiting ===== */
$rateLimitFile = DATA_DIR . '/login_attempts.json';
$rateLimitWindow = 900; /* 15 minutos */
$rateLimitMax = 6; /* max intentos por ventana */

function getClientIP() {
  if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ips = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
    return trim($ips[0]);
  }
  return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

function checkRateLimit($file, $window, $max) {
  $ip = getClientIP();
  $now = time();
  $data = [];
  if (file_exists($file)) {
    $raw = file_get_contents($file);
    $data = json_decode($raw, true) ?? [];
  }
  /* limpiar entradas expiradas */
  $data = array_values(array_filter($data, function($e) use($now, $window) { return $e['time'] > ($now - $window); }));
  $attempts = array_values(array_filter($data, function($e) use($ip) { return $e['ip'] === $ip; }));
  if (count($attempts) >= $max) {
    http_response_code(429);
    echo json_encode(['error_code' => 'rate_limited', 'retry_after' => $window]);
    exit;
  }
  $data[] = ['ip' => $ip, 'time' => $now];
  $dir = dirname($file);
  if (!is_dir($dir)) mkdir($dir, 0755, true);
  file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT), LOCK_EX);
}

function clearRateLimit($file) {
  $ip = getClientIP();
  if (!file_exists($file)) return;
  $raw = file_get_contents($file);
  $data = json_decode($raw, true) ?? [];
  $data = array_values(array_filter($data, function($e) use($ip) { return $e['ip'] !== $ip; }));
  file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT), LOCK_EX);
}

if ($method === 'POST') {
  $input = json_decode(file_get_contents('php://input'), true) ?? [];

  if (!empty($input['action']) && $input['action'] === 'logout') {
    if (session_status() === PHP_SESSION_NONE) {
      sessionCookie();
      session_start();
    }
    $_SESSION = [];
    session_destroy();
    echo json_encode(['ok' => true]);
    exit;
  }

  checkRateLimit($rateLimitFile, $rateLimitWindow, $rateLimitMax);

  $user = $input['username'] ?? '';
  $pass = $input['password'] ?? '';

  $authOk = false;
  foreach ($ADMIN_USERS as $u) {
    if (password_verify($user, $u['username']) && password_verify($pass, $u['hash'])) { $authOk = true; break; }
  }
  if ($authOk) {
    clearRateLimit($rateLimitFile);
    if (session_status() === PHP_SESSION_NONE) {
      sessionCookie();
      session_start();
    }
    session_regenerate_id(true);
    $_SESSION['authenticated'] = true;
    $_SESSION['user'] = $user;
    $_SESSION['login_time'] = time();
    echo json_encode(['ok' => true, 'user' => $user]);
  } else {
    http_response_code(401);
    echo json_encode(['error_code' => 'invalid_credentials']);
  }
  exit;
}

/* GET: clear rate limit (secret token for testing) */
if (isset($_GET['reset_rate_limit'])) {
  if ($_GET['reset_rate_limit'] === 'reset2024liriano') {
    if (file_exists($rateLimitFile)) @unlink($rateLimitFile);
    echo json_encode(['ok' => true]);
  } else {
    http_response_code(403);
    echo json_encode(['error' => 'invalid_token']);
  }
  exit;
}

/* GET: verificar sesión */
requireAuth();
echo json_encode(['ok' => true, 'user' => $_SESSION['user'] ?? '']);
