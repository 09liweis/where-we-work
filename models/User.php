<?php

class User {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }
    public function login($email, $password) {
        $sql = 'SELECT * FROM users WHERE email = :email AND password = :password';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':email', $email, PDO::PARAM_STR);
        $pdostmt->bindValue(':password', md5($password), PDO::PARAM_STR);
        $pdostmt->execute();
        $user = $pdostmt->fetch(PDO::FETCH_ASSOC);
        return $user;
    }
    public function updateLastLogin($id) {
        $ip = $_SERVER['REMOTE_ADDR'];
        $sql = 'UPDATE users SET last_login = NOW(), ip = :ip WHERE id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_STR);
        $pdostmt->bindValue(':ip', $ip, PDO::PARAM_STR);
        $pdostmt->execute();
    }
    public function getPassword($employee_id) {
        $sql = 'SELECT password from users WHERE id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $employee_id, PDO::PARAM_STR);
        $pdostmt->execute();
        $password = $pdostmt->fetch(PDO::FETCH_COLUMN);
        return $password;
    }
    public function upsert($user) {
        $password = $user['password'];
        $oldPassword = $this->getPassword($user['id']);
        if ($password != $oldPassword) {
            $hashedPassword = md5($password);
            $user['password'] = $hashedPassword;
        }
        $columns = '';
        $values = '';
        $updates = '';
        foreach ($user as $column => $value) {
            $columns .= $column . ',';
            $values .= ':' . $column . ',';
            if ($column != 'id') {
                $updates .= $column . '= VALUES(`' . $column . '`),';
            }
        }
        $columns = rtrim($columns, ',');
        $values = rtrim($values, ',');
        $updates = rtrim($updates, ',');
        $sql = 'INSERT INTO users (' . $columns . ') VALUES (' . $values . ') ON DUPLICATE KEY UPDATE ' . $updates . ';';
        $pdostmt = $this->db->prepare($sql);
        foreach ($user as $c => $v) {
            $pdostmt->bindValue(':' . $c, $v, PDO::PARAM_STR);
        }
        $pdostmt->execute();
    }
}