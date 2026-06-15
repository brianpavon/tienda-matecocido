<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ordenes', function (Blueprint $table) {
            $table->id('id_orden');
            $table->foreignId('id_usuario')->constrained('usuarios', 'id_usuario');
            $table->decimal('total', 10, 2);
            $table->enum('estado', ['PENDIENTE', 'CONFIRMADA', 'ENVIADA', 'ENTREGADA', 'CANCELADA'])->default('PENDIENTE');
            $table->string('nombre_envio', 200)->nullable();
            $table->string('direccion_envio', 300)->nullable();
            $table->string('telefono_envio', 30)->nullable();
            $table->string('email_envio', 100)->nullable();
            $table->text('notas')->nullable();
            $table->boolean('activo')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ordenes');
    }
};
