<?php

namespace App\Models;

class Color extends BaseModel
{
    protected $table = 'colores';
    protected $primaryKey = 'id_color';

    protected $fillable = [
        'codigo',
        'nombre',
        'path_img',
        'activo',
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];

    public function productos()
    {
        return $this->belongsToMany(Producto::class, 'productos_colores', 'id_color', 'id_prod')
            ->withTimestamps();
    }
}
