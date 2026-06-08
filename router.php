<?php
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($path === '/app' || $path === '/app/') {
  include __DIR__ . '/app/index.html';
  return true;
}

if (preg_match('#^/app/jobs(/|/new|/\d{6}-\d{5})?$#', $path)) {
  include __DIR__ . '/app/jobs.html';
  return true;
}

if ($path === '/app/records' || $path === '/app/records/') {
  include __DIR__ . '/app/record.html';
  return true;
}

if ($path === '/app/login' || $path === '/app/login/') {
  include __DIR__ . '/app/login.html';
  return true;
}

return false;
