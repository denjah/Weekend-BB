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

$dataFile = __DIR__ . '/data/comments.json';
if (!is_dir(__DIR__ . '/data')) mkdir(__DIR__ . '/data', 0755, true);

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
        'author' => isset($input['author']) ? htmlspecialchars($input['author']) : 'Пользователь',
        'text' => htmlspecialchars($input['text']),
        'timestamp' => time(),
    ];
    
    $comments[] = $newComment;
    file_put_contents($dataFile, json_encode($comments, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    
    echo json_encode(['status' => 'success', 'data' => $newComment]);
    exit;
}

