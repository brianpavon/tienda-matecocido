<?php

namespace Enum;

use MyCLabs\Enum\Enum;

class UserRole extends Enum
{
    const ADMIN = 1;
    const CLIENTE = 2;
    const EDITOR = 3;

    public static function IsValidArea($area)
    {
        switch ($area) {
            case "ADMIN":
                return true;
            case "CLIENTE":
                return true;
            case "EDITOR":
                return true;
            default:
                return false;
        }
    }

    public static function GetDescription($role)
    {
        switch ($role) {
            case UserRole::ADMIN:
                return "ADMIN";
            case UserRole::CLIENTE:
                return "CLIENTE";
            case UserRole::EDITOR:
                return "EDITOR";
        }
    }

    public static function GetVal($role)
    {
        switch ($role) {
            case "ADMIN":
                return UserRole::ADMIN;
            case "CLIENTE":
                return UserRole::CLIENTE;
            case "EDITOR":
                return UserRole::EDITOR;
            default:
                return false;
        }
    }
}
