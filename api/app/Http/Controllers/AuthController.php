<?php

namespace App\Http\Controllers;

use App\Http\Traits\ApiResponseTrait;
use App\Models\Usuario;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use ApiResponseTrait;

    public function registro(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email|unique:usuarios,email',
            'password' => 'required|min:6|confirmed',
        ]);

        $usuario = Usuario::create([
            'email' => $request->email,
            'clave' => Hash::make($request->password),
            'id_rol' => 2, // CLIENTE
        ]);

        $deviceId = $this->getDeviceId($request);
        $token = $usuario->createToken($deviceId)->plainTextToken;

        return $this->createdResponse([
            'token' => $token,
            'role' => $usuario->role,
            'usuario' => $usuario->only(['id_usuario', 'email']),
        ], 'Registro exitoso');
    }

    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $usuario = Usuario::where('email', $request->email)
            ->where('activo', true)
            ->first();

        if (!$usuario || !Hash::check($request->password, $usuario->clave)) {
            return $this->errorResponse('Credenciales incorrectas', null, 401);
        }

        $deviceId = $this->getDeviceId($request);

        // Eliminar token anterior del mismo dispositivo
        $usuario->tokens()->where('name', $deviceId)->delete();

        $token = $usuario->createToken($deviceId)->plainTextToken;

        return $this->successResponse([
            'token' => $token,
            'role' => $usuario->role,
            'usuario' => $usuario->only(['id_usuario', 'email']),
        ], 'Login exitoso');
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return $this->noContentResponse('Sesión cerrada exitosamente');
    }

    public function me(Request $request): JsonResponse
    {
        $usuario = $request->user();
        $usuario->load('datosPersonales');

        return $this->successResponse([
            'id_usuario' => $usuario->id_usuario,
            'email' => $usuario->email,
            'role' => $usuario->role,
            'datos_personales' => $usuario->datosPersonales,
        ]);
    }

    public function cambiarPassword(Request $request): JsonResponse
    {
        $request->validate([
            'password_actual' => 'required',
            'password' => 'required|min:6|confirmed',
        ]);

        $usuario = $request->user();

        if (!Hash::check($request->password_actual, $usuario->clave)) {
            return $this->errorResponse('La contraseña actual es incorrecta', null, 422);
        }

        $usuario->clave = Hash::make($request->password);
        $usuario->save();

        return $this->noContentResponse('Contraseña actualizada exitosamente');
    }

    private function getDeviceId(Request $request): string
    {
        return $request->header('X-Device-Id', md5($request->userAgent()));
    }
}
