<?php

namespace Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


class AuthController
{
    //Funcion que verifica credenciales y loguea
    public function login(Request $request, Response $response){
        return $response;
    }

    //Funcion que registra a un usuario por primera vez
     //Crea Usuarios
     public function crearUsuario(Request $request,Response $response){
        return $response;
    }
}