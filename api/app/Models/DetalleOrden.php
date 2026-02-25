<?php

namespace App\Models;

class DetalleOrden extends BaseModel
{
    protected $table = 'detalle_ordenes';
    protected $primaryKey = 'id_detalle';

    public $timestamps = false;

    const UPDATED_AT = null;

    protected $fillable = [
        'id_orden',
        'id_prod',
        'cantidad',
        'precio_unitario',
        'subtotal',
    ];

    protected $casts = [
        'cantidad' => 'integer',
        'precio_unitario' => 'decimal:2',
        'subtotal' => 'decimal:2',
    ];

    public function orden()
    {
        return $this->belongsTo(Orden::class, 'id_orden', 'id_orden');
    }

    public function producto()
    {
        return $this->belongsTo(Producto::class, 'id_prod', 'id_prod');
    }
}
