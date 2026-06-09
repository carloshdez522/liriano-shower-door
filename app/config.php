<?php
define('ADMIN_USER', 'liriano');
/* Hash bcrypt de la contraseña: Mis@el2012 */
define('ADMIN_PASS_HASH', '$2y$10$/onSqMNakTgiAKCmqyaTgezcnnXM/7xHDcSjF.xobdDlJM5oIiAhi');
define('SESSION_TIMEOUT', 900); /* 15 minutos */

function requireAuth() {
  if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params([
      'lifetime' => 0,
      'path' => '/',
      'secure' => true,
      'httponly' => true,
      'samesite' => 'Lax',
    ]);
    session_start();
  }
  if (empty($_SESSION['authenticated'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
  }
  if (isset($_SESSION['login_time']) && (time() - $_SESSION['login_time']) > SESSION_TIMEOUT) {
    $_SESSION = [];
    session_destroy();
    http_response_code(401);
    echo json_encode(['error' => 'Session expired']);
    exit;
  }
  $_SESSION['login_time'] = time();
}
