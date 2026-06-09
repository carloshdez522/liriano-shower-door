<?php
require_once __DIR__ . '/../config.php';
requireAuth();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

$dataDir = __DIR__ . '/../data';
$dataFile = $dataDir . '/records.json';

if (!is_dir($dataDir)) {
  mkdir($dataDir, 0755, true);
}

if (!file_exists($dataFile)) {
  file_put_contents($dataFile, json_encode([]));
}

function readRecords() {
  global $dataFile;
  $data = file_get_contents($dataFile);
  $records = json_decode($data, true);
  return is_array($records) ? $records : [];
}

function writeRecords($records) {
  global $dataFile;
  $fp = fopen($dataFile, 'c+');
  if (flock($fp, LOCK_EX)) {
    ftruncate($fp, 0);
    fwrite($fp, json_encode($records, JSON_PRETTY_PRINT));
    fflush($fp);
    flock($fp, LOCK_UN);
  }
  fclose($fp);
}

function findNextId($records) {
  if (empty($records)) return 1;
  $ids = array_column($records, 'id');
  return max($ids) + 1;
}

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true) ?? [];

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
          if ((int)$r['jobId'] === (int)$_GET['jobId']) { $filtered[] = $r; }
        }
        echo json_encode($filtered);
      } else {
        echo json_encode($records);
      }
      break;

    case 'POST':
      $records = readRecords();
      $input['id'] = findNextId($records);
      $input['createdAt'] = $input['createdAt'] ?? (int)(microtime(true) * 1000);
      /* Sanitizar strings */
      if (isset($input['jobName'])) $input['jobName'] = strip_tags($input['jobName']);
      if (isset($input['clientName'])) $input['clientName'] = strip_tags($input['clientName']);
      if (isset($input['status'])) $input['status'] = strip_tags($input['status']);
      $records[] = $input;
      writeRecords($records);
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
  http_response_code(500);
  echo json_encode(['error' => $e->getMessage()]);
}
