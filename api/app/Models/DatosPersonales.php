<?php

namespace App\Models;

class DatosPersonales extends BaseModel
{
    protected $table = 'datos_personales';
    protected $primaryKey = 'id_datos_personales';

    protected $fillable = [
        'id_usuario',
        'nombre',
        'apellido',
        'telefono',
        'calle',
        'altura',
        'cod_postal',
    ];

    protected $casts = [
        'telefono' => 'integer',
        'altura' => 'integer',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario', 'id_usuario');
    }
}
