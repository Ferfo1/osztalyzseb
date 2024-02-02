<?php
session_start();
require_once('db_config.php');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    $password2 = $_POST['password2'] ?? '';
    if ($password !== $password2) {
        echo json_encode(['success' => false, 'message' => 'A jelszó nem eggyezik.']);
    }

        saveUserCredentials($username, $password);
        $_SESSION['loggedIn'] = true;
        $_SESSION['username'] = $username;
        echo json_encode(['success' => true, 'username' => $username]);
    
} else {
    echo json_encode(['success' => false, 'message' => 'Hibás kérés.']);
}

function saveUserCredentials($username, $password) {
    $db = getDB();
    $stmt = $db->prepare("INSERT INTO `felhasznalok`(`felhasznalo`, `jelszo`) VALUES (:felhasznalo,:jelszo)");
    $stmt->bindParam(":felhasznalo", $username, PDO::PARAM_STR);
    $stmt->bindParam(":jelszo", password_hash($password, PASSWORD_BCRYPT), PDO::PARAM_STR);
    $stmt->execute();
}

?>
