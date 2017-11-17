<?php

class Company {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }
    public function upsert($company) {
        $columns = '';
        $values = '';
        $updates = '';
        foreach ($company as $column => $value) {
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
        foreach ($company as $c => $v) {
            $pdostmt->bindValue(':' . $c, $v, PDO::PARAM_STR);
        }
        $pdostmt->execute();
    }
}