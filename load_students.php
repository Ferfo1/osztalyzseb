<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_SESSION['loggedIn'])) {
        $username = $_SESSION['username'];
        $data = file_get_contents("data/${username}_students.txt");
        echo $data;
    } else {
        echo 'Hiba: Nincs bejelentkezve.';
    }
} else {
    echo 'Hiba: Érvénytelen kérés.';
}
?>