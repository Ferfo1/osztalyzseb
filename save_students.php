<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_SESSION['loggedIn'])) {
        $username = $_SESSION['username'];
        $data = file_get_contents('php://input');
        file_put_contents("data/${username}_students.txt", $data);
        echo 'Adatok sikeresen mentve.';
    } else {
        echo 'Hiba: Nincs bejelentkezve.';
    }
} else {
    echo 'Hiba: Érvénytelen kérés.';
}
?>
