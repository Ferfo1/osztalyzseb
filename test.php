<?php
include 'config.php';
$con=mysql_connect("$host","$username","$password") or die("Server Error");
mysql_select_db("$database") or die("Database error");

if($con==true)
{
    echo "Success";
}
else
{
    mysql_close($con);
}
?>