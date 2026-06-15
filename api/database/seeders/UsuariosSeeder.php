<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsuariosSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();
        $clave = Hash::make('123456');

        DB::table('usuarios')->insert([
            ['id_usuario' => 1, 'email' => 'daian_2130@hotmail.com', 'clave' => $clave, 'id_rol' => 1, 'activo' => true, 'created_at' => $now, 'updated_at' => $now],
            ['id_usuario' => 2, 'email' => 'brian.pavon@hotmail.com', 'clave' => $clave, 'id_rol' => 1, 'activo' => true, 'created_at' => $now, 'updated_at' => $now],
            ['id_usuario' => 4, 'email' => 'brian@mail.com', 'clave' => $clave, 'id_rol' => 2, 'activo' => true, 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}
