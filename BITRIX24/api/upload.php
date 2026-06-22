<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Обработка preflight запроса
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// В будущем здесь будет проверка Битрикс авторизации:
// require_once $_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/prolog_before.php';
// if (!$USER->IsAuthorized()) { die(json_encode(['status'=>'error', 'message'=>'Unauthorized'])); }

$uploadDir = __DIR__ . '/../uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$response = ['status' => 'error', 'message' => 'No files uploaded'];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sectionId = isset($_GET['section_id']) ? $_GET['section_id'] : null;
    $dataFile = __DIR__ . '/data/uploads.json';
    $uploads = file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : [];
    if (!is_array($uploads)) $uploads = [];
    
    if ($sectionId) {
        $uploads = array_filter($uploads, function($u) use ($sectionId) {
            return $u['section_id'] === $sectionId;
        });
    }
    
    // Sort by timestamp desc
    usort($uploads, function($a, $b) {
        return $b['timestamp'] - $a['timestamp'];
    });
    
    // Преобразуем path для фронта (отдаем относительный путь для веба)
    $uploads = array_map(function($u) {
        $u['url'] = '/uploads/' . $u['section_id'] . '/' . basename($u['path']);
        return $u;
    }, $uploads);

    echo json_encode(array_values($uploads));
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $sectionId = isset($_POST['section_id']) ? $_POST['section_id'] : 'uncategorized';
    
    // Очистка sectionId для безопасности
    $sectionId = preg_replace('/[^a-zA-Z0-9_-]/', '', $sectionId);
    
    $sectionDir = $uploadDir . $sectionId . '/';
    if (!is_dir($sectionDir)) {
        mkdir($sectionDir, 0755, true);
    }
    
    $file = $_FILES['file'];
    $filename = basename($file['name']);
    $safeFilename = time() . '_' . preg_replace('/[^a-zA-Z0-9_.-]/', '', $filename);
    $targetPath = $sectionDir . $safeFilename;
    
    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        // Логирование в JSON
        $dataFile = __DIR__ . '/data/uploads.json';
        if (!is_dir(__DIR__ . '/data')) mkdir(__DIR__ . '/data', 0755, true);
        
        $uploads = file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : [];
        if (!is_array($uploads)) $uploads = [];
        
        $uploadRecord = [
            'id' => uniqid('up_'),
            'section_id' => $sectionId,
            'filename' => $filename,
            'path' => $targetPath,
            'url' => '/uploads/' . $sectionId . '/' . $safeFilename,
            'size' => $file['size'],
            'timestamp' => time(),
            'user' => isset($_POST['user_name']) ? $_POST['user_name'] : 'Пользователь'
        ];
        
        $uploads[] = $uploadRecord;
        file_put_contents($dataFile, json_encode($uploads, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        
        $response = ['status' => 'success', 'data' => $uploadRecord];
    } else {
        $response = ['status' => 'error', 'message' => 'Failed to move file'];
    }
}

echo json_encode($response);
