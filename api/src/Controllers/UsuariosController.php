<?php

namespace Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Models\Usuario;

class UsuariosController
{
      //Devuelve la lista de usuarios
      public function obtenerUsuarios(Request $request, Response $response){
        return $response;
    }

   
}