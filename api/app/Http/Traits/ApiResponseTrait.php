<?php

namespace App\Http\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponseTrait
{
    protected function successResponse($content, string $message = 'OK', int $statusCode = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'content' => $content,
        ], $statusCode);
    }

    protected function createdResponse($content, string $message = 'Recurso creado exitosamente'): JsonResponse
    {
        return $this->successResponse($content, $message, 201);
    }

    protected function noContentResponse(string $message = 'Operación exitosa'): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'content' => null,
        ], 200);
    }

    protected function errorResponse(string $message = 'Error', $errors = null, int $statusCode = 400): JsonResponse
    {
        $response = [
            'success' => false,
            'message' => $message,
            'content' => null,
        ];

        if ($errors !== null) {
            $response['errors'] = $errors;
        }

        return response()->json($response, $statusCode);
    }

    protected function notFoundResponse(string $message = 'Recurso no encontrado'): JsonResponse
    {
        return $this->errorResponse($message, null, 404);
    }

    protected function validationErrorResponse($errors, string $message = 'Error de validación'): JsonResponse
    {
        return $this->errorResponse($message, $errors, 422);
    }
}
