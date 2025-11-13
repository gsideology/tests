<?php
// Test: Basic PHP Server with errors
// There are errors in this code. Can you find and fix them?

// Start session
session_start();

// Database configuration
$db_host = 'localhost';
$db_name = 'test_db';
$db_user = 'root';
$db_pass = '';

// Connect to database
$conn = new mysqli($db_host, $db_user, $db_password, $db_name);//

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get user input
$username = $_POST['username'];
$email = $_POST['email'];

//

// Validate and sanitize input
if (empty($username) || empty($email)) {
    http_response_code(400);
    echo json_encode(['error' => 'Username and email are required']);
    exit;
}

// Check if user exists
$stmt = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
$stmt->bind_param("ss", $username, $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    http_response_code(409);
    echo json_encode(['error' => 'User already exists']);
    exit;
}

// Insert new user
$hashed_password = password_hash($password, PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $hashed_password);

if ($stmt->execute()) {
    $_SESSION['user_id'] = $conn->insert_id;
    echo json_encode([
        'status' => 'success',
        'message' => 'User created successfully',
        'user_id' => $conn->insert_id
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to create user']);
}

$stmt->close();
$conn->close();

