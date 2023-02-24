<?php

namespace Controllers;

use Components\GenericResponse;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

//MODELOS
use Models\Categoria;

class CategoriasController
{

    //Devuelve las categorias
    public function obtenerCategorias(Request $request, Response $response){
        try {
            $todasLasCategs = Categoria::get();
            if(!$todasLasCategs){
                $response->getBody()->write(GenericResponse::obtain(false,"No se encontraron categorías.",$todasLasCategs));
                $response->withStatus(400);
            }else{
                $response->getBody()->write(GenericResponse::obtain(true,"Se muestran todas las categorías.",$todasLasCategs));
                $response->withStatus(200);
            }
        } catch (\Throwable $th) {
            $response->getBody()->write(GenericResponse::obtain(false,$th->getMessage(),$th));
            $response->withStatus(500);
        }
        return $response;
    }

    //Crea una nueva categoria
    public function nuevaCategoria(Request $request, Response $response){
        
        try {
            $codigoCateg = $request->getParsedBody()['codigo'] ?? '';
            $nombreCateg = $request->getParsedBody()['nombre'] ?? '';

            if(!$codigoCateg || !$nombreCateg){
                $response->getBody()->write(GenericResponse::obtain(false,'No se enviaron los datos necesarios.'));
                $response->withStatus(400);
            }else{
                $nuevaCategoria = Categoria::create([
                    'codigo' => $codigoCateg,
                    'nombre' => $nombreCateg
                ]);
    
                if(!$nuevaCategoria){
                    $response->getBody()->write(GenericResponse::obtain(false,'No se pudo crear la categoría',$nuevaCategoria));
                    $response->withStatus(400);
                }else{                
                    $response->getBody()->write(GenericResponse::obtain(true,'Se creó la nueva categoría',$nuevaCategoria));
                    $response->withStatus(200);
                }
            }
        } catch (\Throwable $th) {
            $response->getBody()->write(GenericResponse::obtain(false,$th->getMessage(),$th));
            $response->withStatus(500);
        }
        
        return $response;
    }
}