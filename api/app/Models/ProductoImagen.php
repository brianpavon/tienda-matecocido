<?php

namespace App\Models;

class ProductoImagen extends BaseModel
{
    protected $table = 'productos_imagenes';
    protected $primaryKey = 'id_img_prod';

    protected $fillable = [
        'id_prod',
        'path_img',
        'nombre',
    ];

    public function producto()
    {
        return $this->belongsTo(Producto::class, 'id_prod', 'id_prod');
    }
}
