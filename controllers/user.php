<?php

require '../models/Database.php';
require '../models/User.php';

header('Content-Type: application/json');

$uRepo = new User(Database::dbConnect());

session_start();

if ($_GET['action'] == 'login') {
    $user = $_POST['user'];
    $email = $user['email'];
    $password = $user['password'];
    $employee = $uRepo->login($email, $password);
    if ($employee) {
        $_SESSION['id'] = $employee['id'];
        $_SESSION['name'] = $employee['name'];
        $_SESSION['email'] = $employee['email'];
        $uRepo->updateLastLogin($employee['id']);
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

if ($_GET['action'] == 'upsert') {
    $uRepo->upsert($_POST);
    echo json_encode(array('code' => 200));
}