<?php

namespace Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'usuarios';
    protected $primaryKey = 'id_usuario';

    protected $fillable = [        
        'email',
        'clave',
        'id_rol'
    ];
    protected $hidden = ['id_usuario','clave','created_at'];
  
}