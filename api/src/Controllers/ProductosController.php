<?php

namespace Controllers;

use Components\GenericResponse;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

//Modelos
use Models\Categoria;
use Models\Producto;
use Models\Color;

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
            

            $nuevoProducto = new Producto;
            // $nuevoProducto = Producto::create([
            //     'codigo' => $codigoProd,
            //     'nombre' => $nombreProd
            // ]);

            $response->getBody()->write(GenericResponse::obtain(true,"Se creó un nuevo producto",$nuevoProducto));
            $response->withStatus(200);
        } catch (\Throwable $th) {
            $response->getBody()->write(GenericResponse::obtain(false,$th->getMessage(),$th));
            $response->withStatus(500);
        }
        return $response;
    }

}