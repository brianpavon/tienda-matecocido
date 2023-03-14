<?php

namespace Controllers;

use Components\GenericResponse;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

//Modelos
use Models\Categoria;
use Models\Producto;
use Models\Color;
use Models\ProductoCategoria;
use Models\ProductoColor;
use Models\ProductoImagen;

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
        try {            
            $codigoProd = isset($request->getParsedBody()['codigoProd']) ? $request->getParsedBody()['codigoProd'] : '';
            $nombreProd = isset($request->getParsedBody()['nombre']) ? $request->getParsedBody()['nombre'] : '';
            $descripcion = isset($request->getParsedBody()['descripcion']) ? $request->getParsedBody()['descripcion'] : '';
            $precio = isset($request->getParsedBody()['precio']) ? $request->getParsedBody()['precio'] : '';
            $stock = isset($request->getParsedBody()['stock']) ? $request->getParsedBody()['stock'] : '';
            $codigosColor = isset($request->getParsedBody()['codigoColor']) ? explode(',',$request->getParsedBody()['codigoColor']) : '';
            $codigosCategoria = isset($request->getParsedBody()['codigoCategoria']) ? explode(',',$request->getParsedBody()['codigoCategoria']) : '';
            
            $imagenes = $request->getUploadedFiles();

            if(!$codigoProd){
                $response->getBody()->write(GenericResponse::obtain(false,"No se envió el código de producto.",null));
                $response->withStatus(500);
            }
            else{
                //obtengo los ids de las categorias que se cargaron           
                foreach ($codigosCategoria as $codCategoria) {
                    $categ = Categoria::where('codigo',$codCategoria)->first();
                    $idsCategoria[] = ['idCateg'=>$categ->id_categ];
                }

                //obtengo los ids de los colores que se cargaron
                foreach($codigosColor as $codColor){
                    $color = Color::where('codigo',$codColor)->first();
                    $idsColor[] =["idColor"=>$color->id_color];
                }
                
                //creo el producto
                $nuevoProducto = Producto::create([
                    'codigo' => $codigoProd,
                    'nombre' => $nombreProd,
                    'descripcion' => $descripcion,
                    'precio' => $precio,
                    'stock' => $stock
                ]);

                $carpetaProducto = $_ENV["PATH_UPLOAD_IMAGES"].$nuevoProducto->codigo.'/';

                //si no existe el directorio de imagenes lo crea
                if(!file_exists($carpetaProducto)){           
                    mkdir($carpetaProducto,0777,true);
                }
                
        
                //prod-img
                foreach ($imagenes as $imagen) {
                    //$path = explode('/',$imagen);
                    $nameImg = $imagen->getClientFilename();
                    $path = $carpetaProducto.$nameImg;
                    $imagen->moveTo($path);
                    ProductoImagen::create([
                        'id_prod' => $nuevoProducto->id_prod,
                        'path_img' => $path,
                        'nombre' => $nameImg
                    ]);
                }
                
                //prod-categ            
                foreach ($idsCategoria as $idCateg) {
                    ProductoCategoria::create([
                        'id_prod' => $nuevoProducto->id_prod,
                        'id_categ' => $idCateg['idCateg']
                    ]);
                }
                
                //prod-color
                foreach ($idsColor as $idColor) {
                    ProductoColor::create([
                        'id_prod' => $nuevoProducto->id_prod,
                        'id_color' => $idColor['idColor']
                    ]);
                }

                $response->getBody()->write(GenericResponse::obtain(true,"Se creó un nuevo producto",$nuevoProducto));
                $response->withStatus(200);
            }
           
            
        } catch (\Throwable $th) {
            $response->getBody()->write(GenericResponse::obtain(false,$th->getMessage(),$th));
            $response->withStatus(500);
        }
        return $response;
    }

}