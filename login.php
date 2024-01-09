<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if (checkCredentials($username, $password)) {
        $_SESSION['loggedIn'] = true;
        $_SESSION['username'] = $username;

        echo json_encode(['success' => true, 'username' => $username]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Hibás felhasználónév vagy jelszó.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Hibás kérés.']);
}

function checkCredentials($username, $password) {
    $userCredentials = getUserCredentials();
    if (isset($userCredentials[$username]) && $userCredentials[$username] === $password) {
        return true;
    }
    return false;
}

function getUserCredentials() {
    $filename = 'user.json';
    if (file_exists($filename)) {
        $data = file_get_contents($filename);
        return json_decode($data, true) ?: [];
    }
    return [];
}
?>