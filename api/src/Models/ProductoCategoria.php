<?php

namespace Models;

use Illuminate\Database\Eloquent\Model;
use Models\Producto;
use Models\Categoria;

class ProductoCategoria extends Model
{
    protected $table = 'productos_categorias';
    protected $primaryKey = 'id_prod_categ';
    protected $fillable = [
        'id_prod',
        'id_categ'
    ];

    public function producto()
    {
        return $this->belongsTo(Producto::class,'id_prod');
    }

    public function categoria()
    {
        return $this->belongsTo(Categoria::class,'id_categ');
    }
    
}