<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if ($data === null) {
        echo json_encode(array("message" => "Error: Failed to parse request data: " . json_last_error_msg()));
        exit;
    }

    $email = $data['email'];
    $password = $data['password'];

    // Check if the email exists in the coach table
    $sql = "SELECT * FROM coach WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            $response = array(
                "message" => "Login successful for coach.",
                "coach_id" => $row['id'],
                "email" => $row['email'],
                "role" => "coach"
            );
            echo json_encode($response);
            exit;
        }
    }

    // Check if the email exists in the organizator table
    $sql = "SELECT * FROM organizator WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            $response = array(
                "message" => "Login successful for organizator.",
                "table_id" => $row['id'],
                "email" => $row['email'],
                "role" => "organizator"
            );
            echo json_encode($response);
            exit;
        }
    }

    http_response_code(401);
    echo json_encode(array("message" => "Error: Incorrect email or password."));
    $conn->close();
    exit;
}
?>
