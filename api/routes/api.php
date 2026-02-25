<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\OrdenController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

// === PUBLICAS (sin auth) ===
Route::get('/health', [HealthController::class, 'index']);

Route::get('/productos', [ProductoController::class, 'index']);
Route::get('/productos/{codigo}', [ProductoController::class, 'show']);
Route::get('/categorias', [CategoriaController::class, 'index']);
Route::get('/colores', [ColorController::class, 'index']);

// === AUTH ===
Route::prefix('auth')->group(function () {
    Route::post('/registro', [AuthController::class, 'registro']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
        Route::put('/cambiar-password', [AuthController::class, 'cambiarPassword']);
    });
});

// === RUTAS PROTEGIDAS (auth requerida) ===
Route::middleware('auth:sanctum')->group(function () {

    // --- CLIENTE ---
    Route::post('/ordenes', [OrdenController::class, 'store']);
    Route::get('/ordenes/mis-ordenes', [OrdenController::class, 'misOrdenes']);

    // --- ADMIN ---
    Route::middleware('role:ADMIN')->group(function () {
        Route::apiResource('productos', ProductoController::class)->except(['index', 'show']);
        Route::apiResource('categorias', CategoriaController::class)->except(['index']);
        Route::apiResource('colores', ColorController::class)->except(['index']);
        Route::get('/usuarios', [UsuarioController::class, 'index']);
        Route::get('/usuarios/{id}', [UsuarioController::class, 'show']);
        Route::put('/usuarios/{id}/toggle-activo', [UsuarioController::class, 'toggleActivo']);
        Route::get('/ordenes', [OrdenController::class, 'index']);
        Route::get('/ordenes/{id}', [OrdenController::class, 'show']);
        Route::put('/ordenes/{id}/estado', [OrdenController::class, 'cambiarEstado']);
    });
});
