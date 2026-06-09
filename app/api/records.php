<?php
require_once __DIR__ . '/../config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

requireAuth();

$dataDir = __DIR__ . '/../data';
$dataFile = $dataDir . '/records.json';

if (!is_dir($dataDir)) {
  mkdir($dataDir, 0755, true);
}

function readRecords() {
  global $dataFile;
  $fp = @fopen($dataFile, 'c+');
  if (!$fp) { logError('records.php: fopen failed for ' . $dataFile); return []; }
  if (!flock($fp, LOCK_SH)) { logError('records.php: flock(LOCK_SH) failed for ' . $dataFile); fclose($fp); return []; }
  $data = stream_get_contents($fp);
  flock($fp, LOCK_UN);
  fclose($fp);
  $records = json_decode($data, true);
  return is_array($records) ? $records : [];
}

function writeRecords($records) {
  global $dataFile;
  $fp = @fopen($dataFile, 'c+');
  if (!$fp) { logError('records.php: fopen(c+) failed for writeRecords'); return false; }
  if (!flock($fp, LOCK_EX)) { logError('records.php: flock(LOCK_EX) failed for writeRecords'); fclose($fp); return false; }
  ftruncate($fp, 0);
  rewind($fp);
  fwrite($fp, json_encode($records, JSON_PRETTY_PRINT));
  fflush($fp);
  flock($fp, LOCK_UN);
  fclose($fp);
  return true;
}

function findNextId($records) {
  if (empty($records)) return 1;
  $ids = array_column($records, 'id');
  return max($ids) + 1;
}

$method = $_SERVER['REQUEST_METHOD'];

try {
  switch ($method) {
    case 'GET':
      $records = readRecords();
      if (isset($_GET['id'])) {
        $found = null;
        foreach ($records as $r) {
          if ((int)$r['id'] === (int)$_GET['id']) { $found = $r; break; }
        }
        if ($found) {
          echo json_encode($found);
        } else {
          http_response_code(404);
          echo json_encode(['error' => 'Record not found']);
        }
      } elseif (isset($_GET['jobId'])) {
        $filtered = [];
        foreach ($records as $r) {
          if ((int)($r['jobId'] ?? 0) === (int)$_GET['jobId']) {
            $filtered[] = $r;
          }
        }
        echo json_encode($filtered);
      } else {
        echo json_encode($records);
      }
      break;

    case 'POST':
      $input = json_decode(file_get_contents('php://input'), true) ?? [];
      $records = readRecords();
      $input['id'] = findNextId($records);
      $input['createdAt'] = $input['createdAt'] ?? (int)(microtime(true) * 1000);
      $records[] = $input;
      if (!writeRecords($records)) {
        logError('records.php: writeRecords failed on POST');
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save']);
        exit;
      }
      backupData();
      echo json_encode($input);
      break;

    case 'DELETE':
      $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
      $records = readRecords();
      $newRecords = [];
      $deleted = false;
      foreach ($records as $r) {
        if ((int)$r['id'] === $id) { $deleted = true; }
        else { $newRecords[] = $r; }
      }
      if ($deleted) {
        writeRecords($newRecords);
        backupData();
        echo json_encode(['ok' => true]);
      } else {
        http_response_code(404);
        echo json_encode(['error' => 'Record not found']);
      }
      break;

    default:
      http_response_code(405);
      echo json_encode(['error' => 'Method not allowed']);
  }
} catch (Exception $e) {
  logError('records.php: ' . $e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine());
  http_response_code(500);
  echo json_encode(['error' => 'Internal server error']);
}
