<?php

require '../models/Database.php';
require '../models/Place.php';
require '../models/UserPlace.php';

//require 'vendor/autoload.php';

$pRepo = new Place(Database::dbConnect());

header('Content-Type: application/json');


if ($_GET['action'] == 'upsert') {
    $place = $_POST;
    $pRepo->upsert($place);
    $result = array('msg' => 'Update', 'status' => 200);
    echo json_encode($result);
}

if ($_GET['action'] == 'savePlace') {
    $place = $_POST['place'];
    $exist = $pRepo->checkExist($place['google_place_id']);
    if ($exist) {
        $placeId = $exist['id'];
    } else {
        $placeId = $pRepo->upsert($place);
    }
    if ($placeId) {
        session_start();
        $userId = $_SESSION['id'];
        $usRepo = new UserPlace(Database::dbConnect());
        $usRepo->insert($userId, $placeId, $_POST['title']);
        echo json_encode('ok');
    } else {
        echo 'no place';
    }
}