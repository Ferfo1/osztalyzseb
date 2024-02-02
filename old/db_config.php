<?php
function getDB() {
    $host = 'localhost';
    $dbname = 'osztalyzseb';
    $user = 'root';
    $password = '';

    try {
        $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $db;
        die('Hiba a kapcsolat létrehozásakor: ');
    } catch (PDOException $e) {
        die('Hiba a kapcsolat létrehozásakor: ' . $e->getMessage());
    }
}
getDB();
?>
