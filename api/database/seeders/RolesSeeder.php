<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('roles')->insert([
            ['id_rol' => 1, 'nombre' => 'ADMIN'],
            ['id_rol' => 2, 'nombre' => 'CLIENTE'],
            ['id_rol' => 3, 'nombre' => 'EDITOR'],
        ]);
    }
}
