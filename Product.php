<?php

class Product {
    // properties
    public $id;
    public $name;
    public $price;
    public $size;

    // construct
    public function __construct($id, $name, $price, $size) {
        $this->id = $id;
        $this->name = $name;
        $this->price = $price;
        $this->size = $size;
    }
}