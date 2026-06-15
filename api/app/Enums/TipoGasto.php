<?php

namespace App\Enums;

enum TipoGasto: string
{
    case INSUMOS = 'INSUMOS';
    case HORNEADAS = 'HORNEADAS';
    case ALQUILER = 'ALQUILER';
    case PUBLICIDAD = 'PUBLICIDAD';
    case OTROS = 'OTROS';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function validationRule(): string
    {
        return 'in:' . implode(',', self::values());
    }
}
