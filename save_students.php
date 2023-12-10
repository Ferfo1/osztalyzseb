<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = file_get_contents('php://input');
    file_put_contents('students.txt', $data);
    echo 'Adatok sikeresen mentve.';
} else {
    echo 'Hiba: Érvénytelen kérés.';
}
?>
