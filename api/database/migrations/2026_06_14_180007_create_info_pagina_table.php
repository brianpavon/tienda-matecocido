<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('info_pagina', function (Blueprint $table) {
            $table->id('id_info');
            $table->text('sobre_mi')->nullable();
            $table->string('ubicacion', 200)->nullable();
            $table->integer('whatsapp')->nullable();
            $table->string('instagram', 150)->nullable();
            $table->string('facebook', 150)->nullable();
            $table->text('extras')->nullable();
            $table->text('extras_2')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('info_pagina');
    }
};
