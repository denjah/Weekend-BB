<?php
header('Content-Type: application/json');

// В будущем здесь будет проверка Битрикс авторизации:
// require_once $_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/prolog_before.php';
// if (!$USER->IsAuthorized()) { die(json_encode(['status'=>'error', 'message'=>'Unauthorized'])); }

$dataFile = 'data/comments.json';
if (!is_dir('data')) mkdir('data', 0755, true);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sectionId = isset($_GET['section_id']) ? $_GET['section_id'] : null;
    $comments = file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : [];
    if (!is_array($comments)) $comments = [];
    
    if ($sectionId) {
        $comments = array_filter($comments, function($c) use ($sectionId) {
            return $c['section_id'] === $sectionId;
        });
    }
    
    // Sort by timestamp desc
    usort($comments, function($a, $b) {
        return $b['timestamp'] - $a['timestamp'];
    });
    
    echo json_encode(array_values($comments));
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['text']) || !isset($input['section_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
        exit;
    }
    
    $comments = file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : [];
    if (!is_array($comments)) $comments = [];
    
    $newComment = [
        'id' => uniqid('c_'),
        'section_id' => $input['section_id'],
        'text' => htmlspecialchars($input['text']),
        'timestamp' => time(),
        'user' => isset($input['user_name']) ? htmlspecialchars($input['user_name']) : 'Арт-директор (Bitrix Mock)'
    ];
    
    $comments[] = $newComment;
    file_put_contents($dataFile, json_encode($comments, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    
    echo json_encode(['status' => 'success', 'data' => $newComment]);
    exit;
}
