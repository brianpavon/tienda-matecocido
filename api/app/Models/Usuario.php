<?php

namespace App\Models;

use App\Enums\Role;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'usuarios';
    protected $primaryKey = 'id_usuario';

    protected $fillable = [
        'email',
        'clave',
        'id_rol',
        'activo',
    ];

    protected $hidden = [
        'clave',
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];

    public function getAuthPassword()
    {
        return $this->clave;
    }

    public function getRoleAttribute(): string
    {
        return match ($this->id_rol) {
            1 => Role::ADMIN->value,
            2 => Role::CLIENTE->value,
            default => Role::CLIENTE->value,
        };
    }

    public function rol()
    {
        return $this->belongsTo(RolModel::class, 'id_rol', 'id_rol');
    }

    public function datosPersonales()
    {
        return $this->hasOne(DatosPersonales::class, 'id_usuario', 'id_usuario');
    }

    public function ordenes()
    {
        return $this->hasMany(Orden::class, 'id_usuario', 'id_usuario');
    }
}
