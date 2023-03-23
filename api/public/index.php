<?php


require __DIR__ . '/../vendor/autoload.php';
//Establezco la hora local
date_default_timezone_set('America/Argentina/Buenos_Aires');


use Config\Database;
use Slim\Factory\AppFactory;
use Middlewares\JsonMiddleware;
use Slim\Routing\RouteCollectorProxy;
//use Middlewares\Authentication\AuthMiddleware;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

//Controllers
use Controllers\ProductosController;
use Controllers\UsuariosController;
use Controllers\AuthController;
use Controllers\CategoriasController;
use Controllers\ColoresController;

//Crea la conexión a la DB
$conn = new Database();
$app = AppFactory::create();

//PARA USAR ARCHIVOS .ENV
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__.'/..');
$dotenv->load();

//establecemos la url base
$app->setBasePath('/tienda-matecocido/api/public');//url local

//para ver si web api funciona
$app->get('/', function (Request $request, Response $response, array $args) {
    $response->getBody()->write("Hola soy el backend de Tienda Mate Cocido!");
    return $response;
});

/**
 * Rutas para login y crear usuarios
 */

//$app->get('/auth/login',ProductosController::class . ":obtenerProductos");
$app->group('/auth',function (RouteCollectorProxy $group){
    $group->post('/login',AuthController::class . ":login");
    $group->post('/crear-usuario',AuthController::class . ":crearUsuario");
});


/**
 * Rutas para productos
 */
$app->group('/productos',function (RouteCollectorProxy $group){
    $group->get('[/]',ProductosController::class . ":obtenerProductos");
    $group->get('/producto-categoria/{categoria}',ProductosController::class . ":obtenerProductosPorCategoria");
    $group->get('/{codProd}',ProductosController::class . ":obtenerProductoPorCodigo");
    $group->post('/nuevo-producto',ProductosController::class . ":nuevoProducto");
    $group->post('/editar-producto/{cod}',ProductosController::class . ":editarProducto");
    $group->delete('/eliminar-producto/{cod}',ProductosController::class . ":deleteProduct");
});

/**
 * Rutas para Categorias
 */
$app->group('/categorias',function (RouteCollectorProxy $group){
    $group->get('[/]',CategoriasController::class . ":obtenerCategorias");
    $group->post('/nueva-categoria',CategoriasController::class . ":nuevaCategoria");
});

/**
 * Rutas para colores
 */
$app->group('/colores',function(RouteCollectorProxy $group){
    $group->get('[/]',ColoresController::class . ":obtenerColores");
    $group->post('/nuevo-color',ColoresController::class . ":nuevoColor");
});


/**
 * Rutas para usuarios
 */

$app->add(new JsonMiddleware());
$app->addBodyParsingMiddleware();

$app->run();
