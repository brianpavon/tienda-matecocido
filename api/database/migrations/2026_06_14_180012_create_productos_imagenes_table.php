<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('productos_imagenes', function (Blueprint $table) {
            $table->id('id_img_prod');
            $table->foreignId('id_prod')->constrained('productos', 'id_prod')->cascadeOnDelete();
            $table->string('path_img', 250);
            $table->string('nombre', 50);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('productos_imagenes');
    }
};
