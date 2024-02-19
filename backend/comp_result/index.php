<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type");

include_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT c.id AS couple_id, 
        CONCAT(d1.first_name, ' ', d1.second_name) AS partner1_name, 
        CONCAT(d2.first_name, ' ', d2.second_name) AS partner2_name,
        c.age_category AS couple_age_category,
        c.class AS couple_class,
        coach.full_name AS coach_full_name,
        coach.city, 
        coach.club_name,
        comp.id AS competition_id,
        comp.title AS competition_title,
        comp.date AS competition_date,
        comp.location AS competition_location,
        comp.description AS competition_description,
        r.win_place,
        r.couples_number,
        org.id AS organizator_id
        FROM couples c
        JOIN dancer d1 ON c.dancer_id1 = d1.id
        JOIN dancer d2 ON c.dancer_id2 = d2.id
        JOIN coach ON d1.coach_id = coach.id
        JOIN results r ON c.id = r.couples_id
        JOIN competition comp ON r.competition_id = comp.id
        JOIN organizator org ON comp.organizator_id = org.id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $couples = array();
        while ($row = $result->fetch_assoc()) {
            $couples[] = $row;
        }
        echo json_encode($couples);
    } else {
        echo json_encode(array("message" => "No couples found."));
    }

    $conn->close();
    exit;
}
