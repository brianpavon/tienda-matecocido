<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductosCategoriasSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        DB::table('productos_categorias')->insert([
            ['id_prod_categ' => 7, 'id_prod' => 10, 'id_categ' => 1, 'created_at' => $now, 'updated_at' => $now],
            ['id_prod_categ' => 11, 'id_prod' => 19, 'id_categ' => 1, 'created_at' => $now, 'updated_at' => $now],
            ['id_prod_categ' => 14, 'id_prod' => 44, 'id_categ' => 8, 'created_at' => $now, 'updated_at' => $now],
            ['id_prod_categ' => 15, 'id_prod' => 67, 'id_categ' => 1, 'created_at' => $now, 'updated_at' => $now],
            ['id_prod_categ' => 16, 'id_prod' => 67, 'id_categ' => 7, 'created_at' => $now, 'updated_at' => $now],
            ['id_prod_categ' => 19, 'id_prod' => 38, 'id_categ' => 1, 'created_at' => $now, 'updated_at' => $now],
            ['id_prod_categ' => 20, 'id_prod' => 68, 'id_categ' => 1, 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}
