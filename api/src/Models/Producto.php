<?php

namespace Models;

use Illuminate\Database\Eloquent\Model;
use Models\ProductoImagen;
use Models\ProductoCategoria;
use Models\ProductoColor;
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

    public function productCategories()
    {
        return $this->hasMany(ProductoCategoria::class,'id_prod');
    }

    public function productColor()
    {
        return $this->hasMany(ProductoColor::class,'id_prod');
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

    public function getCodesCategory(){
        $codesCateg = [];
        foreach ($this->categorias as $categ) {
            array_push($codesCateg,$categ->codigo);
        }
        return $codesCateg;
    }

    public function getCodesColor(){
        $codesColor = [];
        foreach ($this->colores as $col) {
            array_push($codesColor,$col->codigo);
        }
        return $codesColor;
    }

    public function getIdsCategory(){
        $codesCateg = [];
        foreach ($this->categorias as $categ) {
            array_push($codesCateg,$categ->id_categ);
        }
        return $codesCateg;
    }

    public function getIdsColor(){
        $codesColor = [];
        foreach ($this->colores as $col) {
            array_push($codesColor,$col->id_color);
        }
        return $codesColor;
    }

    public function getImagesName(){
        $imagesName = [];
        foreach ($this->imagenes as $img) {
            array_push($imagesName,$img->nombre);
        }
        return $imagesName;
    }

}