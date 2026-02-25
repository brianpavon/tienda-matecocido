<?php

namespace App\Enums;

enum Role: string
{
    case ADMIN = 'ADMIN';
    case CLIENTE = 'CLIENTE';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function validationRule(): string
    {
        return 'in:' . implode(',', self::values());
    }
}
