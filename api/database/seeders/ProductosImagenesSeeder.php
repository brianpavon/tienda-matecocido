<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductosImagenesSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        DB::table('productos_imagenes')->insert([
            ['id_img_prod' => 11, 'id_prod' => 10, 'path_img' => 'imgs-productos/taza-pepe/taza_peperina.jpg', 'nombre' => 'taza_peperina.jpg', 'created_at' => $now, 'updated_at' => $now],
            ['id_img_prod' => 14, 'id_prod' => 19, 'path_img' => 'imgs-productos/taza-matecocido/tazas_matecocido.jpg', 'nombre' => 'tazas_matecocido.jpg', 'created_at' => $now, 'updated_at' => $now],
            ['id_img_prod' => 17, 'id_prod' => 44, 'path_img' => 'imgs-productos/florero-peque/florero_chico.jpg', 'nombre' => 'florero_chico.jpg', 'created_at' => $now, 'updated_at' => $now],
            ['id_img_prod' => 18, 'id_prod' => 67, 'path_img' => 'imgs-productos/taza-cafe-plato/tazas_cafecitas.jpg', 'nombre' => 'tazas_cafecitas.jpg', 'created_at' => $now, 'updated_at' => $now],
            ['id_img_prod' => 25, 'id_prod' => 38, 'path_img' => 'imgs-productos/taza-jengibre/taza_jengibre.jpg', 'nombre' => 'taza_jengibre.jpg', 'created_at' => $now, 'updated_at' => $now],
            ['id_img_prod' => 26, 'id_prod' => 38, 'path_img' => 'imgs-productos/taza-jengibre/taza_jengibre_frente.jpg', 'nombre' => 'taza_jengibre_frente.jpg', 'created_at' => $now, 'updated_at' => $now],
            ['id_img_prod' => 27, 'id_prod' => 19, 'path_img' => 'imgs-productos/taza-matecocido/taza_matecocido_matecocido.jpg', 'nombre' => 'taza_matecocido_matecocido.jpg', 'created_at' => $now, 'updated_at' => $now],
            ['id_img_prod' => 28, 'id_prod' => 19, 'path_img' => 'imgs-productos/taza-matecocido/taza_matecocido_jaspeada.jpg', 'nombre' => 'taza_matecocido_jaspeada.jpg', 'created_at' => $now, 'updated_at' => $now],
            ['id_img_prod' => 29, 'id_prod' => 68, 'path_img' => 'imgs-productos/tazon-malva/taza-malva.jpg', 'nombre' => 'taza-malva.jpg', 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}
