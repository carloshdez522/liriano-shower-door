<?php
require_once __DIR__ . '/../config.php';
requireAuth();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

$dataDir = __DIR__ . '/../data';
$dataFile = $dataDir . '/jobs.json';

if (!is_dir($dataDir)) {
  mkdir($dataDir, 0755, true);
}

if (!file_exists($dataFile)) {
  $seed = [
    ['id' => 1001, 'job' => 'Shower Door Install', 'date' => '2026-06-05', 'name' => 'Maria Rodriguez', 'address' => '1234 SW 8th St, Miami', 'phone' => '+1 (305) 555-0101', 'email' => 'maria@example.com', 'items' => [['id'=>1,'temper'=>true,'item'=>'Frameless sliding door 60"x72"','description'=>'Clear tempered glass, brushed nickel handle','dimensionsW'=>60,'dimensionsH'=>72,'dimensionsUnit'=>'in','glassThickness'=>'Brushed nickel, 3/8 tempered','installation'=>50,'installationUnit'=>'ft','unitPrice'=>618,'price'=>1850]], 'status' => 'estimado', 'createdAt' => 1717603200000],
    ['id' => 1002, 'job' => 'Window Replacement', 'date' => '2026-06-03', 'name' => 'Carlos Mendez', 'address' => '5678 Coral Way, Coral Gables', 'email' => 'carlos@example.com', 'items' => [['id'=>1,'temper'=>false,'item'=>'Double hung window 36"x48"','description'=>'White frame, low-E glass','dimensionsW'=>36,'dimensionsH'=>48,'dimensionsUnit'=>'in','glassThickness'=>'White frame, low-E','installation'=>2,'installationUnit'=>'unit','unitPrice'=>300,'price'=>600],['id'=>2,'temper'=>false,'item'=>'Screen','description'=>'Included','dimensionsW'=>36,'dimensionsH'=>48,'dimensionsUnit'=>'in','glassThickness'=>'Included','installation'=>1,'installationUnit'=>'unit','unitPrice'=>600,'price'=>600]], 'status' => 'estimado', 'createdAt' => 1717430400000],
    ['id' => 1003, 'job' => 'Storefront Glass', 'date' => '2026-05-28', 'name' => 'La Tienda Bakery', 'address' => '8901 W Flagler St, Miami', 'phone' => '+1 (786) 555-0103', 'email' => 'info@latienda.com', 'items' => [['id'=>1,'temper'=>true,'item'=>'Commercial storefront 96"x84"','description'=>'Tempered laminated glass, aluminum frame','dimensionsW'=>96,'dimensionsH'=>84,'dimensionsUnit'=>'in','glassThickness'=>'Aluminum frame, 1/4 laminated','installation'=>1,'installationUnit'=>'unit','unitPrice'=>4200,'price'=>4200]], 'status' => 'estimado', 'createdAt' => 1716825600000],
    ['id' => 1004, 'job' => 'Shower Enclosure', 'date' => '2026-05-20', 'name' => 'Ana Perez', 'address' => '4321 Collins Ave, Miami Beach', 'phone' => '+1 (305) 555-0104', 'items' => [['id'=>1,'temper'=>true,'item'=>'Offset shower door 48"x76"','description'=>'Clear glass, chrome hinges, rain guard','dimensionsW'=>48,'dimensionsH'=>76,'dimensionsUnit'=>'in','glassThickness'=>'Chrome hinges, 3/8 clear','installation'=>1,'installationUnit'=>'unit','unitPrice'=>2100,'price'=>2100]], 'status' => 'estimado', 'createdAt' => 1716220800000],
    ['id' => 1005, 'job' => 'Mirror Installation', 'date' => '2026-05-15', 'name' => 'Jose Garcia', 'address' => '7777 Bird Rd, Miami', 'email' => 'jose@example.com', 'items' => [['id'=>1,'temper'=>false,'item'=>'Bathroom mirror 36"x48"','description'=>'Beveled edges, silver frame','dimensionsW'=>36,'dimensionsH'=>48,'dimensionsUnit'=>'in','glassThickness'=>'Silver frame, 1/4 beveled','installation'=>1,'installationUnit'=>'unit','unitPrice'=>450,'price'=>450]], 'status' => 'estimado', 'createdAt' => 1715760000000],
    ['id' => 1006, 'job' => 'Glass Railing', 'date' => '2026-05-10', 'name' => 'Ocean View Condo', 'address' => '1500 Ocean Dr, Miami Beach', 'phone' => '+1 (305) 555-0106', 'items' => [['id'=>1,'temper'=>true,'item'=>'Staircase railing 12 linear ft','description'=>'3/8" tempered glass, stainless steel posts','dimensionsW'=>12,'dimensionsH'=>48,'dimensionsUnit'=>'ft','glassThickness'=>'Stainless posts, 3/8 tempered','installation'=>12,'installationUnit'=>'ft','unitPrice'=>3800,'price'=>3800]], 'status' => 'invoice', 'createdAt' => 1715184000000],
    ['id' => 1007, 'job' => 'Shower Door Repair', 'date' => '2026-05-05', 'name' => 'Luis Fernandez', 'address' => '2500 SW 27th Ave, Miami', 'phone' => '+1 (305) 555-0106', 'email' => 'luis@example.com', 'items' => [['id'=>1,'temper'=>true,'item'=>'Replacement roller set','description'=>'Replaced bottom rollers on sliding door','dimensionsW'=>0,'dimensionsH'=>0,'dimensionsUnit'=>'in','glassThickness'=>'Replacement rollers','installation'=>1,'installationUnit'=>'unit','unitPrice'=>250,'price'=>250]], 'status' => 'invoice', 'createdAt' => 1714752000000],
    ['id' => 1008, 'job' => 'Custom Glass Shelf', 'date' => '2026-04-28', 'name' => 'Patricia Lopez', 'address' => '8900 Kendall Dr, Kendall', 'phone' => '+1 (305) 555-0108', 'items' => [['id'=>1,'temper'=>true,'item'=>'Tempered shelf 12"x48"','description'=>'Polished edges, clear glass, brackets','dimensionsW'=>12,'dimensionsH'=>48,'dimensionsUnit'=>'in','glassThickness'=>'Polished edges, clear, 1/2 thick','installation'=>1,'installationUnit'=>'unit','unitPrice'=>320,'price'=>320]], 'status' => 'invoice', 'createdAt' => 1714320000000],
    ['id' => 1009, 'job' => 'Commercial Window', 'date' => '2026-04-20', 'name' => 'Miami Dental Clinic', 'address' => '5500 Biscayne Blvd, Miami', 'phone' => '+1 (305) 555-0109', 'email' => 'info@miamidental.com', 'items' => [['id'=>1,'temper'=>true,'item'=>'Fixed window 72"x60"','description'=>'Tempered insulated, frosted film','dimensionsW'=>72,'dimensionsH'=>60,'dimensionsUnit'=>'in','glassThickness'=>'Frosted film, tempered insulated','installation'=>1,'installationUnit'=>'unit','unitPrice'=>2800,'price'=>2800]], 'status' => 'invoice', 'createdAt' => 1713628800000],
    ['id' => 1010, 'job' => 'Shower Door & Screen', 'date' => '2026-04-15', 'name' => 'Roberto & Sonia Diaz', 'address' => '1200 SW 40th St, Miami', 'phone' => '+1 (305) 555-0110', 'items' => [['id'=>1,'temper'=>true,'item'=>'Pivot shower door 36"x72"','description'=>'3/8" tempered glass, oil-rubbed bronze','dimensionsW'=>36,'dimensionsH'=>72,'dimensionsUnit'=>'in','glassThickness'=>'Oil-rubbed bronze, 3/8 tempered','installation'=>1,'installationUnit'=>'unit','unitPrice'=>3200,'price'=>3200]], 'status' => 'invoice', 'createdAt' => 1713110400000],
  ];
  file_put_contents($dataFile, json_encode($seed, JSON_PRETTY_PRINT));
}

function readJobs() {
  global $dataFile;
  $data = file_get_contents($dataFile);
  $jobs = json_decode($data, true);
  return is_array($jobs) ? $jobs : [];
}

function writeJobs($jobs) {
  global $dataFile;
  $fp = fopen($dataFile, 'c+');
  if (flock($fp, LOCK_EX)) {
    ftruncate($fp, 0);
    fwrite($fp, json_encode($jobs, JSON_PRETTY_PRINT));
    fflush($fp);
    flock($fp, LOCK_UN);
  }
  fclose($fp);
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
      /* Restore: permitir ID específico si no hay conflicto */
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
      /* Sanitizar strings */
      if (isset($input['job'])) $input['job'] = strip_tags($input['job']);
      if (isset($input['name'])) $input['name'] = strip_tags($input['name']);
      if (isset($input['address'])) $input['address'] = strip_tags($input['address']);
      if (isset($input['phone'])) $input['phone'] = strip_tags($input['phone']);
      if (isset($input['email'])) $input['email'] = strip_tags($input['email']);
      $jobs[] = $input;
      writeJobs($jobs);
      echo json_encode($input);
      break;

    case 'PUT':
      $jobs = readJobs();
      $found = false;
      foreach ($jobs as &$j) {
        if ((int)$j['id'] === (int)$input['id']) {
          foreach ($input as $k => $v) { $j[$k] = $v; }
          /* Sanitizar strings */
          if (isset($j['job'])) $j['job'] = strip_tags($j['job']);
          if (isset($j['name'])) $j['name'] = strip_tags($j['name']);
          if (isset($j['address'])) $j['address'] = strip_tags($j['address']);
          if (isset($j['phone'])) $j['phone'] = strip_tags($j['phone']);
          if (isset($j['email'])) $j['email'] = strip_tags($j['email']);
          $found = true;
          $updated = $j;
          break;
        }
      }
      unset($j);
      if ($found) {
        writeJobs($jobs);
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
  http_response_code(500);
  echo json_encode(['error' => $e->getMessage()]);
}
