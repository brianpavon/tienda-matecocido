<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriasSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        DB::table('categorias')->insert([
            ['id_categ' => 1, 'codigo' => 'tazas', 'nombre' => 'Tazas', 'activo' => true, 'created_at' => $now, 'updated_at' => $now],
            ['id_categ' => 7, 'codigo' => 'combo', 'nombre' => 'Combos', 'activo' => true, 'created_at' => $now, 'updated_at' => $now],
            ['id_categ' => 8, 'codigo' => 'hogar-deco', 'nombre' => 'Hogar & Deco', 'activo' => true, 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}
