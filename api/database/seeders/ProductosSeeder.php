<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductosSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        DB::table('productos')->insert([
            ['id_prod' => 10, 'codigo' => 'taza-pepe', 'nombre' => 'Taza Peperina', 'descripcion' => 'Taza de 250 cc, 4 asas de colores', 'precio' => 2300.00, 'stock' => 5, 'activo' => true, 'created_at' => $now, 'updated_at' => $now],
            ['id_prod' => 19, 'codigo' => 'taza-matecocido', 'nombre' => 'Taza Matecocido', 'descripcion' => 'Tazas de 250cc', 'precio' => 1600.00, 'stock' => 2, 'activo' => true, 'created_at' => $now, 'updated_at' => $now],
            ['id_prod' => 38, 'codigo' => 'taza-jengibre', 'nombre' => 'Taza Jengibre', 'descripcion' => 'Taza de 300 cc, 2 colores disponibles', 'precio' => 1800.00, 'stock' => 5, 'activo' => true, 'created_at' => $now, 'updated_at' => $now],
            ['id_prod' => 44, 'codigo' => 'florero-peque', 'nombre' => 'Florero Pequeño', 'descripcion' => 'Florero chico, ideal para ambientar los espacios interiores.', 'precio' => 1200.00, 'stock' => 3, 'activo' => true, 'created_at' => $now, 'updated_at' => $now],
            ['id_prod' => 67, 'codigo' => 'taza-cafe-plato', 'nombre' => 'Taza Cafecitas con Plato', 'descripcion' => 'Tazas para café con plato, se pueden elegir el color de las asas. Se venden en pares.', 'precio' => 1500.00, 'stock' => 4, 'activo' => true, 'created_at' => $now, 'updated_at' => $now],
            ['id_prod' => 68, 'codigo' => 'tazon-malva', 'nombre' => 'Tazones Malva', 'descripcion' => 'Son re grandes, ideales para sopas o mucho mate cocido.', 'precio' => 2200.00, 'stock' => 2, 'activo' => true, 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}
