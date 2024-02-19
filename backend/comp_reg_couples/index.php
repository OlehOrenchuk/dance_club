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

    $dancer_id1 = $data->dancer_id1;
    $dancer_id2 = $data->dancer_id2;
    $age_category = $data->age_category;
    $class = $data->class;
    $competition_id = $data->competition_id;

    $sql = "INSERT INTO couples (dancer_id1, dancer_id2, age_category, class) VALUES ('$dancer_id1', '$dancer_id2', '$age_category', '$class')";

    if ($conn->query($sql) === TRUE) {
//        $couples_id = $conn->insert_id;
        $sql2 = "INSERT INTO results (competition_id, couples_id) VALUES ('$competition_id', (SELECT MAX(id) FROM couples))";

//        $sql2 = "INSERT INTO result (competition_id,couples_id) VALUES ('$couples_id','$competition_id')";

        if ($conn->query($sql2) === TRUE) {
            echo json_encode(array("message" => "Couple registered on competition successfully."));
        } else {
            echo json_encode(array("message" => "Error: " . $conn->error));
        }


    } else {
        echo json_encode(array("message" => "Error: " . $conn->error));
    }

    $conn->close();
    exit;
}
?>
