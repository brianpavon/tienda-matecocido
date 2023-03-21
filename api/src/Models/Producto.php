<?php

namespace Models;

use Illuminate\Database\Eloquent\Model;
use Models\ProductoImagen;
use Models\ProductoCategoria;
use Models\Categoria;
use Models\Color;

class Producto extends Model
{
    protected $table = 'productos';
    protected $primaryKey = 'id_prod';

    protected $fillable = [        
        'codigo',
        'nombre',
        'descripcion',
        'precio',
        'stock'
    ];
    protected $hidden = ['id_prod','created_at'];

    public function imagenes()
    {
        return $this->hasMany(ProductoImagen::class,'id_prod');
    }

    // public function categorias()
    // {
    //     return $this->hasMany(ProductoCategoria::class,'id_prod');
    // }

    public function categorias()
    {
        return $this->belongsToMany(Categoria::class, 'productos_categorias', 'id_prod', 'id_categ');
    }
    
    public function colores()
    {
        return $this->belongsToMany(Color::class, 'productos_colores', 'id_prod', 'id_color');
    }

    public static function getProductosPorCategoria($codCateg){
        return Producto::whereHas('categorias', function ($query) use ($codCateg) {
                                    $query->where('codigo', $codCateg);
                                    })
                                ->get();
    }

    public static function getProductByCode($cod){
        return Producto::where('codigo',$cod)->first();
    }

}