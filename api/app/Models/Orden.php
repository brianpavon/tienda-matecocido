<?php

namespace App\Models;

class Orden extends BaseModel
{
    protected $table = 'ordenes';
    protected $primaryKey = 'id_orden';

    protected $fillable = [
        'id_usuario',
        'total',
        'estado',
        'nombre_envio',
        'direccion_envio',
        'telefono_envio',
        'email_envio',
        'notas',
        'activo',
    ];

    protected $casts = [
        'total' => 'decimal:2',
        'activo' => 'boolean',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario', 'id_usuario');
    }

    public function detalles()
    {
        return $this->hasMany(DetalleOrden::class, 'id_orden', 'id_orden');
    }
}
