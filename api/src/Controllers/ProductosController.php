<?php

namespace Controllers;

use Components\GenericResponse;
use Models\Producto;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ProductosController
{
    //Devuelve todos los productos
    public function obtenerProductos(Request $request,Response $response)
    {
        $productos = Producto::get();
        $response->getBody()->write(GenericResponse::obtain(true,'Todos los productos',$productos,));
        return $response;
    }

    //Crea un nuevo producto
    public function nuevoProducto(Request $request,Response $response){
        
        return $response;
    }

}