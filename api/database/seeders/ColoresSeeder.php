<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ColoresSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        DB::table('colores')->insert([
            ['id_color' => 1, 'codigo' => 'jaspeado', 'nombre' => 'Jaspeado', 'path_img' => null, 'activo' => true, 'created_at' => $now, 'updated_at' => $now],
            ['id_color' => 4, 'codigo' => 'matecocidoUno', 'nombre' => 'Matecocido', 'path_img' => null, 'activo' => true, 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}
