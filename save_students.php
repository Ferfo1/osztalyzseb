<?php
session_start();
require_once('db_config.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_SESSION['loggedIn'])) {
        $username = $_SESSION['username'];
        $data = file_get_contents('php://input');
        $lines = explode("\n", $data);

        $db = getDB();

        foreach ($lines as $line) {
            list($name, $balance) = explode(',', $line);

            $stmt = $db->prepare("SELECT COUNT(*) FROM `osszeg` WHERE nev = :name AND felh_id = (SELECT id FROM `felhasznalok` WHERE felhasznalo = :username)");
            $stmt->bindParam(":name", $name, PDO::PARAM_STR);
            $stmt->bindParam(":username", $username, PDO::PARAM_STR);
            $stmt->execute();
            $count = $stmt->fetchColumn();

            if ($count > 0) {
                $stmt = $db->prepare("UPDATE `osszeg` SET osszeg = :balance WHERE nev = :name AND felh_id = (SELECT id FROM `felhasznalok` WHERE felhasznalo = :username)");
                $stmt->bindParam(":name", $name, PDO::PARAM_STR);
                $stmt->bindParam(":balance", $balance, PDO::PARAM_STR);
                $stmt->bindParam(":username", $username, PDO::PARAM_STR);
                $stmt->execute();
            } else {
                $stmt = $db->prepare("INSERT INTO `osszeg` (nev, osszeg, felh_id) VALUES (:name, :balance, (SELECT id FROM `felhasznalok` WHERE felhasznalo = :username))");
                $stmt->bindParam(":name", $name, PDO::PARAM_STR);
                $stmt->bindParam(":balance", $balance, PDO::PARAM_STR);
                $stmt->bindParam(":username", $username, PDO::PARAM_STR);
                $stmt->execute(); 
            } 
        }

        echo json_encode(['success' => true, 'message' => 'Adatok sikeresen mentve.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Hiba: Nincs bejelentkezve.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Hiba: Érvénytelen kérés.']);
}
?>
