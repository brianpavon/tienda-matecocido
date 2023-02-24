<?php

namespace Controllers;

use Components\GenericResponse;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

//Modelos
use Models\Color;

class ColoresController
{
    //Devuelve todos los colores
    public function obtenerColores(Request $request,Response $response){
        try {
            $todosLosColores = Color::get();
            if(!$todosLosColores){
                $response->getBody()->write(GenericResponse::obtain(false,"No se encontraron colores."));
                $response->withStatus(400);
            }else{
                $response->getBody()->write(GenericResponse::obtain(true,"Todos los colores.",$todosLosColores));
                $response->withStatus(200);
            }
        } catch (\Throwable $th) {
            $response->getBody()->write(GenericResponse::obtain(false,$th->getMessage(),$th));
            $response->withStatus(500);
        }
        return $response;
    }

    //Crea un nuevo color
    public function nuevoColor(Request $request,Response $response){
        try {
            $codigo = $request->getParsedBody()['codigo'] ?? '';
            $nombre = $request->getParsedBody()['nombre'] ?? '';
            $path_img = $request->getParsedBody()['path_img'] ?? '';

            if(!$codigo || !$nombre){
                $response->getBody()->write(GenericResponse::obtain(false,"Debe enviar el código y nombre del color."));
                $response->withStatus(400);
            }else{
                $nuevoColor = Color::create([
                    'codigo' => $codigo,
                    'nombre' => $nombre,
                    'path_img' => $path_img
                ]);
                if(!$nuevoColor){
                    $response->getBody()->write(GenericResponse::obtain(false,"No se pudo crear el color."));
                    $response->withStatus(300);
                }else{
                    $response->getBody()->write(GenericResponse::obtain(true,"Se creó el nuevo color.",$nuevoColor));
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