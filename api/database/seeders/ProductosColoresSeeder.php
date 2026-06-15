<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductosColoresSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        DB::table('productos_colores')->insert([
            ['id_prod_color' => 3, 'id_color' => 1, 'id_prod' => 10, 'created_at' => $now, 'updated_at' => $now],
            ['id_prod_color' => 6, 'id_color' => 1, 'id_prod' => 19, 'created_at' => $now, 'updated_at' => $now],
            ['id_prod_color' => 7, 'id_color' => 4, 'id_prod' => 19, 'created_at' => $now, 'updated_at' => $now],
            ['id_prod_color' => 11, 'id_color' => 1, 'id_prod' => 44, 'created_at' => $now, 'updated_at' => $now],
            ['id_prod_color' => 12, 'id_color' => 1, 'id_prod' => 67, 'created_at' => $now, 'updated_at' => $now],
            ['id_prod_color' => 14, 'id_color' => 1, 'id_prod' => 38, 'created_at' => $now, 'updated_at' => $now],
            ['id_prod_color' => 15, 'id_color' => 1, 'id_prod' => 68, 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}
