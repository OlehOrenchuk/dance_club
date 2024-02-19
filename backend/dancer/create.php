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

    $first_name = $data->first_name;
    $second_name = $data->second_name;
    $age_category = $data->age_category;
    $class = $data->class;
    $coach_id = $data->coach_id;

    $sql = "INSERT INTO dancer (first_name, second_name, age_category, class, coach_id) VALUES ('$first_name', '$second_name', '$age_category', '$class', '$coach_id')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "Dancer added successfully."));
    } else {
        echo json_encode(array("message" => "Error: " . $conn->error));
    }

    $conn->close();
    exit;
}
?>
