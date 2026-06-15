<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('productos_colores', function (Blueprint $table) {
            $table->id('id_prod_color');
            $table->foreignId('id_color')->constrained('colores', 'id_color')->cascadeOnDelete();
            $table->foreignId('id_prod')->constrained('productos', 'id_prod')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('productos_colores');
    }
};
