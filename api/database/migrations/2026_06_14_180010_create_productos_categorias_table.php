<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('productos_categorias', function (Blueprint $table) {
            $table->id('id_prod_categ');
            $table->foreignId('id_prod')->constrained('productos', 'id_prod')->cascadeOnDelete();
            $table->foreignId('id_categ')->constrained('categorias', 'id_categ')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('productos_categorias');
    }
};
