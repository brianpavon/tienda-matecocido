<?php

namespace Models;

use Illuminate\Database\Eloquent\Model;

class Color extends Model{
    protected $table = 'colores';
    protected $primaryKey = 'id_color';
    protected $fillable = [
        'id_color',
        'codigo',
        'nombre',
        'path_img'
    ];
}