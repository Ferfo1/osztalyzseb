<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    $userCredentials = getUserCredentials();
    if (!isset($userCredentials[$username])) {

        $userCredentials[$username] = $password;
        saveUserCredentials($userCredentials);

        createUserDataFile($username);

        $_SESSION['loggedIn'] = true;
        $_SESSION['username'] = $username;

        echo json_encode(['success' => true, 'username' => $username]);
    } else {

        echo json_encode(['success' => false, 'message' => 'A felhasználónév már foglalt.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Hibás kérés.']);
}

function getUserCredentials() {
    $filename = 'user.json';
    if (file_exists($filename)) {
        $data = file_get_contents($filename);
        return json_decode($data, true) ?: [];
    }
    return [];
}

function saveUserCredentials($credentials) {
    $filename = 'user.json';
    $data = json_encode($credentials, JSON_PRETTY_PRINT);
    file_put_contents($filename, $data);
}

?>
