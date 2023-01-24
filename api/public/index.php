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

//Crea la conexión a la DB
$conn = new Database();
$app = AppFactory::create();

//establecemos la url base
$app->setBasePath('/tienda-matecocido/api/public');//url local

//para ver si web api funciona
$app->get('/', function (Request $request, Response $response, array $args) {
    $response->getBody()->write("Hola soy el backend de Tienda Mate Cocido!");
    return $response;
});

/**
 * Login
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
    $group->post('/nuevo-producto',ProductosController::class . ":nuevoProducto");
});

/**
 * Rutas para Categorias
 */
$app->group('/categorias',function (RouteCollectorProxy $group){
    $group->get('[/]',ProductosController::class . ":obtenerProductos");
    $group->post('/nueva-categoria',ProductosController::class . ":nuevoProducto");
});


/**
 * Rutas para usuarios
 */

$app->add(new JsonMiddleware());
$app->addBodyParsingMiddleware();

$app->run();
