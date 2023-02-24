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
            $codigoProd = $request->getParsedBody()['codigoProd'];
            $nombreProd = $request->getParsedBody()['nombre'];
            $descripcion = $request->getParsedBody()['descripcion'];
            $precio = $request->getParsedBody()['precio'];
            $stock = $request->getParsedBody()['stock'];
            $codigosColor = $request->getParsedBody()['codigoColor'];
            $codigosCategoria = $request->getParsedBody()['codigoCategoria'];
            $imagenes = $request->getParsedBody()['imagenes'];
            

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

            //prod-img
            foreach ($imagenes as $imagen) {
                $path = explode('/',$imagen);
                $nameImg = array_pop($path);
                ProductoImagen::create([
                    'id_prod' => $nuevoProducto->id_prod,
                    'path_img' => $imagen,
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
        } catch (\Throwable $th) {
            $response->getBody()->write(GenericResponse::obtain(false,$th->getMessage(),$th));
            $response->withStatus(500);
        }
        return $response;
    }

}