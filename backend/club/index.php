<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type");

include_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "select club.id as club_id,
       club.title as club_name,
       club.city,
       coach.full_name as coach_full_name
        from club
        inner join coach on
        coach.id = club.coach_id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $clubs = array();
        while ($row = $result->fetch_assoc()) {
            $clubs[] = $row;
        }
        echo json_encode($clubs);
    } else {
        echo json_encode(array("message" => "No club found."));
    }

    $conn->close();
    exit;
}

