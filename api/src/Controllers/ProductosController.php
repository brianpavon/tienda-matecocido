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
    public function obtenerProductos(Request $request,Response $response){
        $productos = Producto::get();
        foreach ($productos as $producto) {
            $producto->imagenes;
            $producto->categorias;
            $producto->colores;
        }        
        $response->getBody()->write(GenericResponse::obtain(true,'Todos los productos',$productos,));
        return $response;
    }
    
    //Devuelve todos los productos
    public function obtenerProductosPorCategoria(Request $request,Response $response,$args){
        $categ = $args['categoria'];
        $productos = Producto::getProductosPorCategoria($categ);

        foreach ($productos as $producto) {
            $producto->imagenes;
            $producto->categorias;
        }        
        $response->getBody()->write(GenericResponse::obtain(true,'Todos los productos',$productos,));
        return $response;
    }

    //Devuele un producto de acuerdo a su código
    public function obtenerProductoPorCodigo(Request $request,Response $response, $args){
        $cod = $args['codProd'];
        try {
            $producto = Producto::getProductByCode($cod);
            $producto->imagenes;
            $producto->categorias;
            $producto->colores;
            $response->getBody()->write(GenericResponse::obtain(true,'Se muestra el producto',$producto));
            $response->withStatus(200);
        } catch (\Throwable $th) {
            $response->getBody()->write(GenericResponse::obtain(false,$th->getMessage()));
            $response->withStatus(500);
        }
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
                    //$categ = Categoria::where('codigo',$codCategoria)->first();
                    //$idsCategoria[] = ['idCateg'=>$categ->id_categ];
                    $idsCategoria[] = ['idCateg'=>Categoria::getCategoryIdByCode($codCategoria)];
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

    //Editar un producto
    public function editarProducto(Request $request,Response $response,$args){
        try {
            $codigoProd = $args['cod'];            
            $nuevoCodigoProd = isset($request->getParsedBody()['codigoProd']) ? $request->getParsedBody()['codigoProd'] : '';
            $nombreProd = isset($request->getParsedBody()['nombre']) ? $request->getParsedBody()['nombre'] : '';
            $descripcion = isset($request->getParsedBody()['descripcion']) ? $request->getParsedBody()['descripcion'] : '';
            $precio = isset($request->getParsedBody()['precio']) ? $request->getParsedBody()['precio'] : '';
            $stock = isset($request->getParsedBody()['stock']) ? $request->getParsedBody()['stock'] : '';
            $codigosColor = isset($request->getParsedBody()['codigoColor']) ? explode(',',$request->getParsedBody()['codigoColor']) : '';
            $codigosCategoria = isset($request->getParsedBody()['codigoCategoria']) ? explode(',',$request->getParsedBody()['codigoCategoria']) : '';
            
            $imagenes = $request->getUploadedFiles();
            $seEdito = false;

            $productoDB = Producto::where('codigo',$codigoProd)->first();
            
            //Verifico que campos estan distintos para modificar
            if($productoDB->codigo != $nuevoCodigoProd){
                $productoDB->codigo = $nuevoCodigoProd;
                $seEdito = true;
            }
            if($productoDB->nombre != $nombreProd){
                $productoDB->nombre = $nombreProd;
                $seEdito = true;
            }
            if($productoDB->descipcion != $descripcion){
                $productoDB->descripcion = $descripcion;
                $seEdito = true;
            }
            if($productoDB->precio != $precio){
                $productoDB->precio = $precio;
                $seEdito = true;
            }
            if($productoDB->stock != $stock){
                $productoDB->stock = $stock;
                $seEdito = true;
            }
            
            //Seccion manejo de imagenes
            $carpetaProducto = $_ENV["PATH_UPLOAD_IMAGES"].$productoDB->codigo.'/';
            
            $nombresImgsNuevas = [];
            $nombresImgsBorrar = [];
            $nombreImgsDB = [];
            $nombresImgsEnviadas = [];
           
            //guardo los nombres de las imagenes de la db
            $nombreImgsDB = $productoDB->getImagesName();
            
            //guardo los nombres de las imagenes que se envian por petición
            foreach ($imagenes as $imagen) {
                
                array_push($nombresImgsEnviadas,$imagen->getClientFilename());
            }

            //armo el nuevo array con el nombre de las imagenes que sean nuevas
            $nombresImgsNuevas = array_values(array_diff($nombresImgsEnviadas,$nombreImgsDB));
            
            //armo el array con los nombres de imagenes que hay que borrar
            $nombresImgsBorrar = array_values(array_diff($nombreImgsDB,$nombresImgsEnviadas));
            
            //Si hay nuevas            
            if(count($nombresImgsNuevas) > 0){
                
                for ($i=0; $i < count($nombresImgsNuevas); $i++) {

                    foreach ($imagenes as $imagen) {

                        $nombreImg = $imagen->getClientFilename();
                        
                        if($nombreImg == $nombresImgsNuevas[$i]){
                            $path = $carpetaProducto.$nombreImg;
                            $imagen->moveTo($path);
                            ProductoImagen::create([
                                'id_prod' => $productoDB->id_prod,
                                'path_img' => $path,
                                'nombre' => $nombreImg
                            ]);
                        }
                    }
                }
            }
            //Si hubiera que borrar
            if(count($nombresImgsBorrar) > 0){
                
                foreach ($productoDB->imagenes as $imagen) {

                    for ($i=0; $i < count($nombresImgsBorrar); $i++) {
                        $nameImg = $imagen->nombre;
                        $path = $carpetaProducto.$nameImg;

                        if($nameImg == $nombresImgsBorrar[$i] && file_exists($path)){
                            unlink($path);
                            $imagen->delete();
                        }
                    }
                }
            }

            //Manejo de categorías
            
            //Primero obtengo los ids de las categorias enviadas
            foreach ($codigosCategoria as $categ) {
                $idsCategoria[] = Categoria::getCategoryIdByCode($categ);
            }

            //Obtengo las categorias que tiene el producto en DB
            $idsCategDB = $productoDB->getIdsCategory();
            
            //Obtengo si hay nuevas categorias
            $newCategs = array_values(array_diff($idsCategoria,$idsCategDB));
            
            //Obtengo las que haya que borrar
            $categsToDelete = array_values(array_diff($idsCategDB,$idsCategoria));
            
            //Agregar Categorias
            if(count($newCategs) > 0){                

                //prod-categ            
                foreach ($newCategs as $idCateg) {
                    
                    ProductoCategoria::create([
                        'id_prod' => $productoDB->id_prod,
                        'id_categ' => $idCateg
                    ]);
                 }
            }
            //Borrar Categorias
            if(count($categsToDelete) > 0){
                
                foreach ($productoDB->productCategories as $categProd) {
                    for ($i=0; $i < count($categsToDelete); $i++) { 
                        if($categProd->id_categ == $categsToDelete[$i]){
                            $categProd->delete();
                        }
                    }
                }
                
            }

            //Manejo de colores
                        
            //Primero obtengo los ids de las categorias enviadas
            foreach ($codigosColor as $cod) {
                $idsColor[] = Color::getIdColorByCode($cod);
            }

            //Obtengo los colores que tiene el producto en DB            
            $idsdColorDB = $productoDB->getIdsColor();
            
            //Obtengo si hay nuevos colores
            $newColors = array_values(array_diff($idsColor,$idsdColorDB));
            
            //Obtengo los que haya que borrar
            $colorsToDelete = array_values(array_diff($idsdColorDB,$idsColor));
            
            //Agregar Colores
            if(count($newColors) > 0){

                //prod-color
                foreach ($newColors as $idColor) {                    
                    ProductoColor::create([
                        'id_prod' => $productoDB->id_prod,
                        'id_color' => $idColor
                    ]);
                 }
            }
            //Borrar Colores
            if(count($colorsToDelete) > 0){
                
                foreach ($productoDB->productColor as $colorProd) {
                    
                    for ($i=0; $i < count($colorsToDelete); $i++) {

                        if($colorProd->id_color == $colorsToDelete[$i]){                            
                            $colorProd->delete();
                        }
                    }
                }
                
            }

            if($seEdito){
                $productoDB->save();                
            }
            $response->getBody()->write(GenericResponse::obtain(true,'Se edito el producto',$productoDB));
            $response->withStatus(200);
        } catch (\Throwable $th) {
            $response->getBody()->write(GenericResponse::obtain(false,$th->getMessage(),$th));
            $response->withStatus(500);
        }
        return $response;
    }

    public function deleteProduct(Request $request,Response $response,$args){
        try {
            //HAY QUE ARMAR LA LOGICA PARA QUE SOLO PUEDA BORRAR UN ADMIN, ES DECIR NOS ENVIEN EL TOKEN DE ADMIN

            $productToDelete = Producto::getProductByCode($args['cod']);
            if($productToDelete){
                //borramos las categorias
                foreach ($productToDelete->productCategories as $prodCateg) {
                    $prodCateg->delete();
                }
                //borramos las imagenes
                foreach ($productToDelete->productColor as $prodColor) {
                    $prodColor->delete();
                }
                //borramos las imagenes
                $productFolder = $_ENV["PATH_UPLOAD_IMAGES"].$productToDelete->codigo.'/';
                foreach ($productToDelete->imagenes as $img) {
                    $nameImg = $img->nombre;
                    $path = $productFolder.$nameImg;

                    if(file_exists($path)){
                        unlink($path);
                    }
                    $img->delete();
                }
                $productToDelete->delete();
            }
            
            $response->getBody()->write(GenericResponse::obtain(true,'Se elimino el producto.',$productToDelete));
            $response->withStatus(200);
        } catch (\Throwable $th) {
            $response->getBody()->write(GenericResponse::obtain(false,$th->getMessage()));
            $response->withStatus(500);
        }
        return $response;
    }

}