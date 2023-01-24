<?php

namespace Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table = 'productos';
    protected $primaryKey = 'id_prod';
    
    protected $fillable = [
        'id_prod',
        'codigo',
        'nombre',
        'descripcion',
        'precio'
    ];

}