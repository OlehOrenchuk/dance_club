<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type");

include_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Check if title competition is provided
    if (isset($_GET['title'])) {
        $title = $_GET['title'];
        $sql = "SELECT c.title AS competition_title, 
            d1.first_name AS first_dancer_firstname, 
            d1.second_name AS first_dancer_lastname, 
            d2.first_name AS second_dancer_firstname, 
            d2.second_name AS second_dancer_lastname,
            cp.age_category,
            cp.class
            FROM competition c
            JOIN results r ON c.id = r.competition_id
            JOIN couples cp ON r.couples_id = cp.id
            JOIN dancer d1 ON cp.dancer_id1 = d1.id
            JOIN dancer d2 ON cp.dancer_id2 = d2.id
            WHERE c.title = '$title'
            AND r.couples_number IS NULL;
            ";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $couples = array();
            while ($row = $result->fetch_assoc()) {
                $couples[] = $row;
            }
            echo json_encode($couples);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "No registered couples found on this competition."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Competition title not provided."));
    }

    $conn->close();
    exit;
}

