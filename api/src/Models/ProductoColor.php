<?php

namespace Models;

use Illuminate\Database\Eloquent\Model;
use Models\Producto;
use Models\Color;

class ProductoColor extends Model
{
    protected $table = 'productos_colores';
    protected $primaryKey = 'id_prod_color';
    protected $fillable = [
        'id_color',
        'id_prod'
    ];

    public function producto()
    {
        return $this->belongsTo(Producto::class,'id_prod');
    }

    public function color()
    {
        return $this->belongsTo(Color::class,'id_prod');
    }
    
}