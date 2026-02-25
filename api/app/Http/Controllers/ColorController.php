<?php

namespace App\Http\Controllers;

use App\Http\Traits\ApiResponseTrait;
use App\Models\Color;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ColorController extends Controller
{
    use ApiResponseTrait;

    public function index(): JsonResponse
    {
        $colores = Color::where('activo', true)->orderBy('nombre')->get();

        return $this->successResponse($colores);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'codigo' => 'required|string|max:15|unique:colores,codigo',
            'nombre' => 'required|string|max:50',
            'path_img' => 'nullable|string|max:250',
        ]);

        $color = Color::create($request->only(['codigo', 'nombre', 'path_img']));

        return $this->createdResponse($color);
    }

    public function show(string $id): JsonResponse
    {
        $color = Color::find($id);

        if (!$color) {
            return $this->notFoundResponse('Color no encontrado');
        }

        return $this->successResponse($color);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $color = Color::find($id);

        if (!$color) {
            return $this->notFoundResponse('Color no encontrado');
        }

        $request->validate([
            'codigo' => 'sometimes|string|max:15|unique:colores,codigo,' . $color->id_color . ',id_color',
            'nombre' => 'sometimes|string|max:50',
            'path_img' => 'nullable|string|max:250',
        ]);

        $color->update($request->only(['codigo', 'nombre', 'path_img']));

        return $this->successResponse($color, 'Color actualizado');
    }

    public function destroy(string $id): JsonResponse
    {
        $color = Color::find($id);

        if (!$color) {
            return $this->notFoundResponse('Color no encontrado');
        }

        $color->activo = false;
        $color->save();

        return $this->noContentResponse('Color eliminado');
    }
}
