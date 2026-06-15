<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     * Orden FK-safe: roles -> usuarios; categorias/colores/productos antes de pivots.
     */
    public function run(): void
    {
        $this->call([
            RolesSeeder::class,
            UsuariosSeeder::class,
            CategoriasSeeder::class,
            ColoresSeeder::class,
            ProductosSeeder::class,
            ProductosCategoriasSeeder::class,
            ProductosColoresSeeder::class,
            ProductosImagenesSeeder::class,
        ]);
    }
}
