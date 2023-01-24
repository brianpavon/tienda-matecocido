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

$conn = new Database();
$app = AppFactory::create();

$app->setBasePath('/tienda-matecocido/api/public');//url local

//para ver si web api funciona
$app->get('/', function (Request $request, Response $response, array $args) {
    $response->getBody()->write("Hola soy el backend de Tienda Mate Cocido!");
    return $response;
});

/**
 * Rutas para productos
 */
$app->group('/productos',function (RouteCollectorProxy $group){
    $group->get('[/]',ProductosController::class . ":obtenerProductos");
});

/**
 * Rutas para Categorias
 */


/**
 * Rutas para usuarios
 */

$app->add(new JsonMiddleware());
$app->addBodyParsingMiddleware();

$app->run();
