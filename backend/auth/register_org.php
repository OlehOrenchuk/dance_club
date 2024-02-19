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
    $company_name = $data->company_name;
    $EDRPOU = $data->EDRPOU;

    $sql = "INSERT INTO organizator (full_name, email, password, company_name, EDRPOU) VALUES ('$full_name', '$email', '$password', '$company_name', '$EDRPOU')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "Organizator registered successfully."));
    } else {
        echo json_encode(array("message" => "Error: " . $conn->error));
    }

    $conn->close();
    exit;
}
?>
