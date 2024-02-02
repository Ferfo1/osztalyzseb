<?php
session_start();
require_once('db_config.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_SESSION['loggedIn'])) {
        $username = $_SESSION['username'];

        $db = getDB();
    
        $stmt = $db->prepare("SELECT nev as name, osszeg as balance FROM `diakok` WHERE felh_id = (SELECT id FROM `felhasznalok` WHERE felhasznalo = :username)");
        $stmt->bindParam(":username", $username, PDO::PARAM_STR);
        $stmt->execute();

        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['success' => true, 'data' => $data]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Hiba: Nincs bejelentkezve.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Hiba: Érvénytelen kérés.']);
}
?>
