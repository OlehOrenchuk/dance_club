<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type");

include_once '../config.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if ($data === null) {
        echo json_encode(array("message" => "Error: Failed to parse request data: " . json_last_error_msg()));
        exit;
    }

    $title = $data->title;
    $date = $data->date;
    $location = $data->location;
    $description = $data->description;
    $organizator_id = $data->organizator_id;


    $sql = "INSERT INTO competition (title, date, location, description, organizator_id) VALUES ('$title', '$date', '$location', '$description', '$organizator_id')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "Competition created successfully."));
    } else {
        echo json_encode(array("message" => "Error: " . $conn->error));
    }

    $conn->close();
    exit;
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM competition";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $competitions = array();
        while ($row = $result->fetch_assoc()) {
            $competitions[] = $row;
        }
        echo json_encode($competitions);
    } else {
        echo json_encode(array("message" => "No competitions found."));
    }

    $conn->close();
    exit;
}
?>
