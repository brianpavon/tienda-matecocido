<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('datos_personales', function (Blueprint $table) {
            $table->id('id_datos_personales');
            $table->foreignId('id_usuario')->constrained('usuarios', 'id_usuario');
            $table->string('nombre', 100);
            $table->string('apellido', 100);
            $table->integer('telefono');
            $table->string('calle', 50);
            $table->integer('altura');
            $table->string('cod_postal', 15);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('datos_personales');
    }
};
