<?php
header('Content-Type: application/json');

// В будущем здесь будет проверка Битрикс авторизации:
// require_once $_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/prolog_before.php';
// if (!$USER->IsAuthorized()) { die(json_encode(['status'=>'error', 'message'=>'Unauthorized'])); }

$uploadDir = '../uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$response = ['status' => 'error', 'message' => 'No files uploaded'];

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
    $targetPath = $sectionDir . time() . '_' . preg_replace('/[^a-zA-Z0-9_.-]/', '', $filename);
    
    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        // Логирование в JSON
        $dataFile = 'data/uploads.json';
        if (!is_dir('data')) mkdir('data', 0755, true);
        
        $uploads = file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : [];
        if (!is_array($uploads)) $uploads = [];
        
        $uploadRecord = [
            'id' => uniqid('up_'),
            'section_id' => $sectionId,
            'filename' => $filename,
            'path' => $targetPath,
            'size' => $file['size'],
            'timestamp' => time(),
            'user' => isset($_POST['user_name']) ? $_POST['user_name'] : 'Арт-директор (Bitrix Mock)'
        ];
        
        $uploads[] = $uploadRecord;
        file_put_contents($dataFile, json_encode($uploads, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        
        $response = ['status' => 'success', 'data' => $uploadRecord];
    } else {
        $response = ['status' => 'error', 'message' => 'Failed to move file'];
    }
}

echo json_encode($response);
