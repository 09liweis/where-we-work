<?php

require '../models/Database.php';
require '../models/User.php';

header('Content-Type: application/json');

$uRepo = new User(Database::dbConnect());

session_start();

if ($_GET['action'] == 'login') {
    $user = $_POST;
    $email = $user['email'];
    $password = $user['password'];
    $user = $uRepo->login($email, $password);
    if ($user) {
        $_SESSION['id'] = $user['id'];
        $_SESSION['name'] = $user['name'];
        $_SESSION['email'] = $user['email'];
        $uRepo->updateLastLogin($user['id']);
        echo json_encode(array('code' => 200, 'data' => $_SESSION));
    } else {
        echo json_encode(array('code' => 404));
    }
}

if ($_GET['action'] == 'checkSession') {
    if (isset($_SESSION['id'])) {
        $uRepo->updateLastLogin($_SESSION['id']);
        echo json_encode(array('code' => 200, 'data' => $_SESSION));
    } else {
        echo json_encode(array('code' => 404, 'msg' => 'Not Login'));
    }
}

if ($_GET['action'] == 'logout') {
    session_destroy();
    echo json_encode(array('code' => 200));
}

if ($_GET['action'] == 'register') {
    $userId = $uRepo->upsert($_POST);
    $user = $uRepo->getUser($userId);
    session_start();
    $_SESSION['id'] = $user['id'];
    $_SESSION['name'] = $user['name'];
    $_SESSION['email'] = $user['email'];
    $uRepo->updateLastLogin($user['id']);
    echo json_encode($user);
}

if ($_GET['action'] == 'userPlace') {
    session_start();
    $userId = $_SESSION['id'];
    $place = $uRepo->getUserPlace($userId);
    echo json_encode($place);
}