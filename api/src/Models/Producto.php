<?php

namespace Models;

use Illuminate\Database\Eloquent\Model;
use Models\ProductoImagen;

class Producto extends Model
{
    protected $table = 'productos';
    protected $primaryKey = 'id_prod';

    protected $fillable = [        
        'codigo',
        'nombre',
        'descripcion',
        'precio'
    ];

    public function imagenes()
    {
        return $this->hasMany(ProductoImagen::class,'id_prod');
    }

}