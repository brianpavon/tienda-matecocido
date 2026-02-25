<?php

namespace App\Models;

class Categoria extends BaseModel
{
    protected $table = 'categorias';
    protected $primaryKey = 'id_categ';

    protected $fillable = [
        'codigo',
        'nombre',
        'activo',
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];

    public function productos()
    {
        return $this->belongsToMany(Producto::class, 'productos_categorias', 'id_categ', 'id_prod')
            ->withTimestamps();
    }
}
