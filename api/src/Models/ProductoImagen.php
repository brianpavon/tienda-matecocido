<?php

namespace Models;

use Illuminate\Database\Eloquent\Model;
use Models\Producto;

class ProductoImagen extends Model
{
    protected $table = 'productos_imagenes';
    protected $primaryKey = 'id_img_prod';
    protected $fillable = [
        'id_prod',
        'path_img',
        'nombre'
    ];
    protected $hidden = ['id_img_prod','id_prod','created_at'];

    public function producto()
    {
        return $this->belongsTo(Producto::class,'id_prod');
    }
    
}