<?php

namespace App\Http\Controllers;

use App\Http\Traits\ApiResponseTrait;
use App\Models\Usuario;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    use ApiResponseTrait;

    public function index(): JsonResponse
    {
        $usuarios = Usuario::with('datosPersonales')
            ->select('id_usuario', 'email', 'id_rol', 'activo', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($u) {
                $u->role = $u->role;
                return $u;
            });

        return $this->successResponse($usuarios);
    }

    public function show(string $id): JsonResponse
    {
        $usuario = Usuario::with('datosPersonales')->find($id);

        if (!$usuario) {
            return $this->notFoundResponse('Usuario no encontrado');
        }

        return $this->successResponse($usuario);
    }

    public function toggleActivo(string $id): JsonResponse
    {
        $usuario = Usuario::find($id);

        if (!$usuario) {
            return $this->notFoundResponse('Usuario no encontrado');
        }

        $usuario->activo = !$usuario->activo;
        $usuario->save();

        return $this->successResponse($usuario, $usuario->activo ? 'Usuario activado' : 'Usuario desactivado');
    }
}
