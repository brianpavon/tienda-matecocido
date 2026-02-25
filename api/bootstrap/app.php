<?php

use App\Http\Middleware\CheckRole;
use App\Http\Middleware\ForceJsonResponse;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__.'/../routes/api.php',
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->api(prepend: [
            ForceJsonResponse::class,
        ]);

        $middleware->alias([
            'role' => CheckRole::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->renderable(function (AuthenticationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'No autenticado',
                'content' => null,
            ], 401);
        });

        $exceptions->renderable(function (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'content' => null,
                'errors' => $e->errors(),
            ], 422);
        });

        $exceptions->renderable(function (QueryException $e) {
            $message = app()->isLocal()
                ? 'Error de base de datos: ' . $e->getMessage()
                : 'Error interno del servidor';

            return response()->json([
                'success' => false,
                'message' => $message,
                'content' => null,
            ], 500);
        });

        $exceptions->renderable(function (HttpExceptionInterface $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage() ?: 'Error del servidor',
                'content' => null,
            ], $e->getStatusCode());
        });
    })->create();
