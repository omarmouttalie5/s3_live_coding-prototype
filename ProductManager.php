<?php

require_once "Product.php";

class ProductManager {
    private string $file = "products.json";

    public function __construct() {
        if(!file_exists($this->file)){
            file_put_contents($this->file, json_encode([], JSON_PRETTY_PRINT));
        }
    }

    public function getAll(): array {
        $content = file_get_contents($this->file);
        $data = json_decode($content, true);
        return is_array($data) ? $data : [];
    }

    public function add(string $name, string $price, string $size): array {
        $items = $this->getAll();

        $item = [
            'id' => count($items) ? max(array_column($items, 'id')) + 1 : 1,
            'name' => htmlspecialchars(trim($name)),
            'price' => htmlspecialchars(trim($price)),
            'size' => htmlspecialchars(trim($size))
        ];

        $items[] = $item;
        file_put_contents($this->file, json_encode($items, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        
        return $item;
    }
}