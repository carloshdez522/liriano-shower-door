<?php
require_once __DIR__ . '/../config.php';

sendSecurityHeaders();
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

requireAuth();

$dataDir = __DIR__ . '/../data';
$dataFile = $dataDir . '/jobs.json';

if (!is_dir($dataDir)) {
  mkdir($dataDir, 0755, true);
}

function readJobs() {
  global $dataFile;
  $fp = @fopen($dataFile, 'c+');
  if (!$fp) { logError('index.php: fopen failed for ' . $dataFile); return []; }
  if (!flock($fp, LOCK_SH)) { logError('index.php: flock(LOCK_SH) failed for ' . $dataFile); fclose($fp); return []; }
  $data = stream_get_contents($fp);
  flock($fp, LOCK_UN);
  fclose($fp);
  $jobs = json_decode($data, true);
  return is_array($jobs) ? $jobs : [];
}

function writeJobs($jobs) {
  global $dataFile;
  $fp = @fopen($dataFile, 'c+');
  if (!$fp) { logError('index.php: fopen(c+) failed for writeJobs'); return false; }
  if (!flock($fp, LOCK_EX)) { logError('index.php: flock(LOCK_EX) failed for writeJobs'); fclose($fp); return false; }
  ftruncate($fp, 0);
  rewind($fp);
  fwrite($fp, json_encode($jobs, JSON_PRETTY_PRINT));
  fflush($fp);
  flock($fp, LOCK_UN);
  fclose($fp);
  return true;
}

function sanitizeString($val) {
  return is_string($val) ? strip_tags($val) : $val;
}

function sanitizeJob($job) {
  foreach (['job','name','address','phone','email'] as $f) {
    if (isset($job[$f])) $job[$f] = sanitizeString($job[$f]);
  }
  if (isset($job['items']) && is_array($job['items'])) {
    foreach ($job['items'] as &$item) {
      foreach (['item','description','glassThickness'] as $f) {
        if (isset($item[$f])) $item[$f] = sanitizeString($item[$f]);
      }
    }
  }
  return $job;
}

function findNextId($jobs) {
  if (empty($jobs)) return 1;
  $ids = array_column($jobs, 'id');
  return max($ids) + 1;
}

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true) ?? [];

try {
  switch ($method) {
    case 'GET':
      $jobs = readJobs();
      if (isset($_GET['id'])) {
        $found = null;
        foreach ($jobs as $j) {
          if ((int)$j['id'] === (int)$_GET['id']) { $found = $j; break; }
        }
        if ($found) {
          echo json_encode($found);
        } else {
          http_response_code(404);
          echo json_encode(['error' => 'Job not found']);
        }
      } else {
        echo json_encode($jobs);
      }
      break;

    case 'POST':
      $jobs = readJobs();
      if (!empty($input['_restore']) && !empty($input['id'])) {
        $restoreId = (int)$input['id'];
        unset($input['_restore']);
        $conflict = false;
        foreach ($jobs as $j) {
          if ((int)$j['id'] === $restoreId) { $conflict = true; break; }
        }
        $input['id'] = $conflict ? findNextId($jobs) : $restoreId;
      } else {
        $input['id'] = findNextId($jobs);
      }
      $input['status'] = $input['status'] ?? 'estimado';
      $input['createdAt'] = $input['createdAt'] ?? (int)(microtime(true) * 1000);
      $input = sanitizeJob($input);
      $jobs[] = $input;
      if (!writeJobs($jobs)) {
        logError('index.php: writeJobs failed on POST');
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save']);
        exit;
      }
      backupData();
      echo json_encode($input);
      break;

    case 'PUT':
      $jobs = readJobs();
      $input = sanitizeJob($input);
      $found = false;
      foreach ($jobs as &$j) {
        if ((int)$j['id'] === (int)$input['id']) {
          foreach ($input as $k => $v) { $j[$k] = $v; }
          $found = true;
          $updated = $j;
          break;
        }
      }
      unset($j);
      if ($found) {
        if (!writeJobs($jobs)) {
          logError('index.php: writeJobs failed on PUT id=' . ($input['id'] ?? 0));
          http_response_code(500);
          echo json_encode(['error' => 'Failed to save']);
          exit;
        }
        backupData();
        echo json_encode($updated);
      } else {
        http_response_code(404);
        echo json_encode(['error' => 'Job not found']);
      }
      break;

    case 'DELETE':
      $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
      $jobs = readJobs();
      $newJobs = [];
      $deleted = false;
      foreach ($jobs as $j) {
        if ((int)$j['id'] === $id) { $deleted = true; }
        else { $newJobs[] = $j; }
      }
      if ($deleted) {
        writeJobs($newJobs);
        backupData();
        echo json_encode(['ok' => true]);
      } else {
        http_response_code(404);
        echo json_encode(['error' => 'Job not found']);
      }
      break;

    default:
      http_response_code(405);
      echo json_encode(['error' => 'Method not allowed']);
  }
} catch (Exception $e) {
  logError('index.php: ' . $e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine());
  http_response_code(500);
  echo json_encode(['error' => 'Internal server error']);
}
