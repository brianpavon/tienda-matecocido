<?php

namespace Models;

use Illuminate\Database\Eloquent\Model;

class Color extends Model{
    protected $table = 'colores';
    protected $primaryKey = 'id_color';
    protected $fillable = [        
        'codigo',
        'nombre',
        'path_img'
    ];

    protected $hidden = ['id_color','created_at'];

    public static function getIdColorByCode($code){
        $color = Color::where('codigo',$code)->first();
        return $color->id_color;
    }
}