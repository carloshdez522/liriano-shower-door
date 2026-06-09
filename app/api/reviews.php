<?php
require_once __DIR__ . '/../config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

/* GET público (approved=true) y POST público (crear review) no requieren auth */
$isPublic = (
  ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['approved'])) ||
  $_SERVER['REQUEST_METHOD'] === 'POST'
);

if (!$isPublic) {
  requireAuth();
}

$dataDir = __DIR__ . '/../data';
$dataFile = $dataDir . '/reviews.json';

if (!is_dir($dataDir)) {
  mkdir($dataDir, 0755, true);
}

function readReviews() {
  global $dataFile;
  $fp = @fopen($dataFile, 'c+');
  if (!$fp) return [];
  if (!flock($fp, LOCK_SH)) { fclose($fp); return []; }
  $data = stream_get_contents($fp);
  flock($fp, LOCK_UN);
  fclose($fp);
  $reviews = json_decode($data, true);
  return is_array($reviews) ? $reviews : [];
}

function writeReviews($reviews) {
  global $dataFile;
  $fp = @fopen($dataFile, 'c+');
  if (!$fp) return false;
  if (!flock($fp, LOCK_EX)) { fclose($fp); return false; }
  ftruncate($fp, 0);
  rewind($fp);
  fwrite($fp, json_encode($reviews, JSON_PRETTY_PRINT));
  fflush($fp);
  flock($fp, LOCK_UN);
  fclose($fp);
  return true;
}

function sanitizeReviewFields(&$data) {
  foreach (['name','text','serviceType','photo'] as $f) {
    if (isset($data[$f]) && is_string($data[$f])) {
      $data[$f] = strip_tags($data[$f]);
    }
  }
}

function findNextId($reviews) {
  if (empty($reviews)) return 1;
  $ids = array_column($reviews, 'id');
  return max($ids) + 1;
}

$method = $_SERVER['REQUEST_METHOD'];

try {
  switch ($method) {
    case 'GET':
      $reviews = readReviews();
      if (isset($_GET['approved'])) {
        $filtered = [];
        foreach ($reviews as $r) {
          if ($r['approved'] === true || $r['approved'] === 'true' || $r['approved'] === 1 || $r['approved'] === '1') {
            $filtered[] = $r;
          }
        }
        echo json_encode(array_reverse($filtered));
      } else {
        echo json_encode($reviews);
      }
      break;

    case 'POST':
      $input = json_decode(file_get_contents('php://input'), true) ?? [];
      $reviews = readReviews();
      $input['id'] = findNextId($reviews);
      $input['status'] = $input['status'] ?? 'pending';
      $input['approved'] = false;
      $input['createdAt'] = $input['createdAt'] ?? (int)(microtime(true) * 1000);
      $input['date'] = $input['date'] ?? date('Y-m-d');
      sanitizeReviewFields($input);
      $reviews[] = $input;
      if (!writeReviews($reviews)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save']);
        exit;
      }
      echo json_encode($input);
      break;

    case 'PUT':
      $input = json_decode(file_get_contents('php://input'), true) ?? [];
      $reviews = readReviews();
      $found = false;
      foreach ($reviews as &$r) {
        if ((int)$r['id'] === (int)($input['id'] ?? 0)) {
          foreach ($input as $k => $v) { $r[$k] = $v; }
          sanitizeReviewFields($r);
          $found = true;
          $updated = $r;
          break;
        }
      }
      unset($r);
      if ($found) {
        if (!writeReviews($reviews)) {
          http_response_code(500);
          echo json_encode(['error' => 'Failed to save']);
          exit;
        }
        echo json_encode($updated);
      } else {
        http_response_code(404);
        echo json_encode(['error' => 'Review not found']);
      }
      break;

    case 'DELETE':
      $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
      $reviews = readReviews();
      $newReviews = [];
      $deleted = false;
      foreach ($reviews as $r) {
        if ((int)$r['id'] === $id) { $deleted = true; }
        else { $newReviews[] = $r; }
      }
      if ($deleted) {
        writeReviews($newReviews);
        echo json_encode(['ok' => true]);
      } else {
        http_response_code(404);
        echo json_encode(['error' => 'Review not found']);
      }
      break;

    default:
      http_response_code(405);
      echo json_encode(['error' => 'Method not allowed']);
  }
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Internal server error']);
}
