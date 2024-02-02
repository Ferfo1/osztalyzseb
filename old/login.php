<?php
session_start();
require_once('db_config.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if (checkCredentials($username, $password)) {
        $_SESSION['loggedIn'] = true;
        $_SESSION['username'] = $username;

        echo(json_encode(['success' => true, 'username' => $username]));
    } else {
        echo(json_encode(['success' => false, 'message' => 'Hibás felhasználónév vagy jelszó.']));
    }
} else {
    echo(json_encode(['success' => false, 'message' => 'Hibás kérés.']));
}

function checkCredentials($username, $password) {
    $db = getDB();
    
    $stmt = $db->prepare("SELECT * FROM `felhasznalok` WHERE felhasznalo = :username ");
    $stmt->bindParam(":username", $username, PDO::PARAM_STR);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if(!$user) return false;
    
    if (password_verify($password, $user["jelszo"])) {
        return true;
    } else {
        return false;
    }
}
?>
