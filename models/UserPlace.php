<?php

class UserPlace {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }
    public function insert($userId, $placeId, $title) {
        $this->remove($userId);
        $sql = 'INSERT INTO user_place (user_id, place_id, title) VALUES (:user_id, :place_id, :title)';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':user_id', $userId, PDO::PARAM_INT);
        $pdostmt->bindValue(':place_id', $placeId, PDO::PARAM_INT);
        $pdostmt->bindValue(':title', $title, PDO::PARAM_STR);
        $pdostmt->execute();
    }
    public function remove($userId) {
        $sql = 'DELETE FROM user_place WHERE user_id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $userId, PDO::PARAM_STR);
        $pdostmt->execute();
    }
}