<?php

namespace App\Models;

use App\Enums\TipoGasto;

class Gasto extends BaseModel
{
    protected $table = 'gastos';
    protected $primaryKey = 'id_gasto';

    protected $fillable = [
        'tipo',
        'monto',
        'fecha',
        'descripcion',
        'activo',
    ];

    protected $casts = [
        'tipo' => TipoGasto::class,
        'monto' => 'decimal:2',
        'fecha' => 'date:Y-m-d',
        'activo' => 'boolean',
    ];
}
