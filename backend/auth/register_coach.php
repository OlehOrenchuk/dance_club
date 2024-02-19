<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include_once '../config.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if ($data === null) {
        echo json_encode(array("message" => "Error: Failed to parse request data: " . json_last_error_msg()));
        exit;
    }

    $full_name = $data->full_name;
    $email = $data->email;
    $password = password_hash($data->password, PASSWORD_DEFAULT);
    $club_name = $data->club_name;
    $EDRPOU = $data->EDRPOU;
    $city = $data->city;

    $sql = "INSERT INTO coach (full_name, email, password, club_name, EDRPOU, city) VALUES ('$full_name', '$email', '$password', '$club_name', '$EDRPOU','$city')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "Coach registered successfully."));
    } else {
        echo json_encode(array("message" => "Error: " . $conn->error));
    }

    $conn->close();
    exit;
}
?>
