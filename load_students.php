<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = file_get_contents('students.txt');
    echo $data;
} else {
    echo 'Hiba: Érvénytelen kérés.';
}
?>
