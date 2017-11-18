<?php

class Place {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }
    public function upsert($place) {
        $columns = '';
        $values = '';
        $updates = '';
        foreach ($place as $column => $value) {
            $columns .= $column . ',';
            $values .= ':' . $column . ',';
            if ($column != 'id') {
                $updates .= $column . '= VALUES(`' . $column . '`),';
            }
        }
        $columns = rtrim($columns, ',');
        $values = rtrim($values, ',');
        $updates = rtrim($updates, ',');
        $sql = 'INSERT INTO places (' . $columns . ') VALUES (' . $values . ') ON DUPLICATE KEY UPDATE ' . $updates . ';';
        $pdostmt = $this->db->prepare($sql);
        foreach ($place as $c => $v) {
            $pdostmt->bindValue(':' . $c, $v, PDO::PARAM_STR);
        }
        $pdostmt->execute();
        return $this->db->lastInsertId();
    }
    
    public function checkExist($id) {
        $sql = 'SELECT * FROM places WHERE google_place_id = :id';
        $pdostmt = $this->db->prepare($sql);
        $pdostmt->bindValue(':id', $id, PDO::PARAM_STR);
        $pdostmt->execute();
        $place = $pdostmt->fetch(PDO::FETCH_ASSOC);
        return $place;
    }
}