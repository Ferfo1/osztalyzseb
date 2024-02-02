<?php
session_start();
require_once('db_config.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_SESSION['loggedIn'])) {
        $username = $_SESSION['username'];
        $data = file_get_contents('php://input');
        $requestData = json_decode($data, true);
        $studentName = $requestData['username'];

        $db = getDB();

        $stmt = $db->prepare("DELETE FROM `osszeg` WHERE nev = :name AND felh_id = (SELECT id FROM `felhasznalok` WHERE felhasznalo = :username)");
        $stmt->bindParam(":name", $studentName, PDO::PARAM_STR);
        $stmt->bindParam(":username", $username, PDO::PARAM_STR);
        $stmt->execute();

        echo json_encode(['success' => true, 'message' => 'Diák sikeresen törölve.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Hiba: Nincs bejelentkezve.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Hiba: Érvénytelen kérés.']);
}
?>
