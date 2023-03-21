<?php

namespace Models;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    protected $table = 'categorias';
    protected $primaryKey = 'id_categ';

    protected $fillable = [        
        'codigo',
        'nombre'
    ];
    protected $hidden = ['id_categ','created_at'];

}