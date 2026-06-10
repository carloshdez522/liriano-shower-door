<?php

// Guard against direct access
if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === 'config.php') {
  http_response_code(403);
  echo 'Forbidden';
  exit;
}

/* Hash bcrypt de la contraseña: Mis@el2012 */
define('ADMIN_PASS_HASH', '$2y$10$/onSqMNakTgiAKCmqyaTgezcnnXM/7xHDcSjF.xobdDlJM5oIiAhi');
define('SESSION_TIMEOUT', 900); /* 15 minutos */
define('DATA_DIR', __DIR__ . '/data');
define('IS_HTTPS', (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (!empty($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443));

function sendSecurityHeaders() {
  header('X-Frame-Options: DENY');
  header('X-Content-Type-Options: nosniff');
  header('Referrer-Policy: no-referrer-when-downgrade');
  header("Content-Security-Policy: default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com https://unpkg.com 'unsafe-inline'; style-src 'self' https://cdnjs.cloudflare.com https://fonts.googleapis.com https://fonts.gstatic.com 'unsafe-inline'; font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://script.google.com; manifest-src 'self'");
}

$ADMIN_USERS = [
  ['username' => '$2b$12$VNSz1CWyVMVsFm22pOM5XugJ1BsLTfXhBi22ZokU8KWeMMo0MYDmC', 'hash' => ADMIN_PASS_HASH],
  ['username' => '$2b$12$Ccw3U.myTR5FLTBiZYkjlOAO8r0tTQCYk1l2jZQ02pGxmLiX/cKGy', 'hash' => '$2y$12$o.l6KyeawZebZD3LgoOPxO/ug1YeiWD0/mhiY4bZVz48UHazZVQjS'],
];

function requireAuth() {
  if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params([
      'lifetime' => 0,
      'path' => '/',
      'secure' => IS_HTTPS,
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

function logError($message) {
  $logDir = DATA_DIR . '/logs';
  if (!is_dir($logDir)) {
    mkdir($logDir, 0755, true);
  }
  $logFile = $logDir . '/app-' . date('Y-m') . '.log';
  $line = '[' . date('Y-m-d H:i:s') . '] ' . $message . PHP_EOL;
  file_put_contents($logFile, $line, FILE_APPEND | LOCK_EX);
}

function backupData() {
  $backupDir = DATA_DIR . '/backups';
  $weekSlot = (intval(date('W')) % 4) + 1;
  $slotDir = $backupDir . '/week' . $weekSlot;
  if (!is_dir($slotDir)) {
    mkdir($slotDir, 0755, true);
  }
  foreach (['jobs.json', 'records.json', 'reviews.json'] as $file) {
    $src = DATA_DIR . '/' . $file;
    $dst = $slotDir . '/' . $file;
    if (file_exists($src)) {
      copy($src, $dst);
    }
  }
}
