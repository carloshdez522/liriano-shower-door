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

  $user = $input['username'] ?? '';
  $pass = $input['password'] ?? '';

  $authOk = false;
  foreach ($ADMIN_USERS as $u) {
    if (password_verify($user, $u['username']) && password_verify($pass, $u['hash'])) { $authOk = true; break; }
  }
  if ($authOk) {
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

/* GET: verificar sesión */
requireAuth();
echo json_encode(['ok' => true, 'user' => $_SESSION['user'] ?? '']);
