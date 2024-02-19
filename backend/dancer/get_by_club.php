<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type");

include_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Check if title club is provided
    if (isset($_GET['title'])) {
        $title = $_GET['title'];
        $sql = "select first_name,
            second_name,
            age_category,
            class,
            coach.id AS coach_id,
            coach.full_name as coach_full_name
            from dancer
            inner join coach on
            dancer.coach_id = coach.id
            inner join club on 
            coach.id = club.coach_id
            where club.title = '$title'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $dancers = array();
            while ($row = $result->fetch_assoc()) {
                $dancers[] = $row;
            }
            echo json_encode($dancers);
        } else {
            echo json_encode(array("message" => "No dancer found."));
        }
    } else {
        echo json_encode(array("message" => "ID not provided."));
    }

    $conn->close();
    exit;
}

