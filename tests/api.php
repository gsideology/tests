<?php
// Test: Simple PHP API with errors
// There are errors in this code. Can you find and fix them?

header('Content-Type: application/json');



$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST') {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);


    $name = $input['name'];
    $age = $input['age'];


    if ($age < 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Age cannot be negative']);
        exit;
    }

    // Process data
    $response = [
        'status' => 'success',
        'message' => "Hello, {$name}! You are {$age} years old.",
        'data' => [
            'name' => $name,
            'age' => $age,
            'created_at' => date('Y-m-d H:i:s')
        ]
    ];

    echo json_encode($response);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}

