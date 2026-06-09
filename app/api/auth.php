<?php
require_once __DIR__ . '/../config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
  $input = json_decode(file_get_contents('php://input'), true) ?? [];

  if (!empty($input['action']) && $input['action'] === 'logout') {
    if (session_status() === PHP_SESSION_NONE) {
      session_set_cookie_params([
        'lifetime' => 0, 'path' => '/', 'httponly' => true, 'samesite' => 'Lax',
      ]);
      session_start();
    }
    $_SESSION = [];
    session_destroy();
    echo json_encode(['ok' => true]);
    exit;
  }

  $user = $input['username'] ?? '';
  $pass = $input['password'] ?? '';

  if ($user === ADMIN_USER && password_verify($pass, ADMIN_PASS_HASH)) {
    if (session_status() === PHP_SESSION_NONE) {
      session_set_cookie_params([
        'lifetime' => 0, 'path' => '/', 'httponly' => true, 'samesite' => 'Lax',
      ]);
      session_start();
    }
    session_regenerate_id(true);
    $_SESSION['authenticated'] = true;
    $_SESSION['user'] = $user;
    $_SESSION['login_time'] = time();
    echo json_encode(['ok' => true, 'user' => $user]);
  } else {
    http_response_code(401);
    echo json_encode(['error' => 'Credenciales inválidas']);
  }
  exit;
}

/* GET: verificar sesión */
requireAuth();
echo json_encode(['ok' => true, 'user' => $_SESSION['user'] ?? '']);
