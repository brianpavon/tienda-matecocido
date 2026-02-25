<?php

namespace App\Models;

class Producto extends BaseModel
{
    protected $table = 'productos';
    protected $primaryKey = 'id_prod';

    protected $fillable = [
        'codigo',
        'nombre',
        'descripcion',
        'precio',
        'stock',
        'activo',
    ];

    protected $casts = [
        'precio' => 'decimal:2',
        'stock' => 'integer',
        'activo' => 'boolean',
    ];

    public function categorias()
    {
        return $this->belongsToMany(Categoria::class, 'productos_categorias', 'id_prod', 'id_categ')
            ->withTimestamps();
    }

    public function colores()
    {
        return $this->belongsToMany(Color::class, 'productos_colores', 'id_prod', 'id_color')
            ->withTimestamps();
    }

    public function imagenes()
    {
        return $this->hasMany(ProductoImagen::class, 'id_prod', 'id_prod');
    }
}
