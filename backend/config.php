<?php
$servername = "localhost";
$username = "root"; 
$password = "root";
$dbname = "dance_club";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
