<?php

namespace App\Http\Controllers;

use App\Http\Traits\ApiResponseTrait;
use App\Models\Categoria;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    use ApiResponseTrait;

    public function index(): JsonResponse
    {
        $categorias = Categoria::where('activo', true)->orderBy('nombre')->get();

        return $this->successResponse($categorias);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'codigo' => 'required|string|max:15|unique:categorias,codigo',
            'nombre' => 'required|string|max:50',
        ]);

        $categoria = Categoria::create($request->only(['codigo', 'nombre']));

        return $this->createdResponse($categoria);
    }

    public function show(string $id): JsonResponse
    {
        $categoria = Categoria::find($id);

        if (!$categoria) {
            return $this->notFoundResponse('Categoría no encontrada');
        }

        return $this->successResponse($categoria);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $categoria = Categoria::find($id);

        if (!$categoria) {
            return $this->notFoundResponse('Categoría no encontrada');
        }

        $request->validate([
            'codigo' => 'sometimes|string|max:15|unique:categorias,codigo,' . $categoria->id_categ . ',id_categ',
            'nombre' => 'sometimes|string|max:50',
        ]);

        $categoria->update($request->only(['codigo', 'nombre']));

        return $this->successResponse($categoria, 'Categoría actualizada');
    }

    public function destroy(string $id): JsonResponse
    {
        $categoria = Categoria::find($id);

        if (!$categoria) {
            return $this->notFoundResponse('Categoría no encontrada');
        }

        $categoria->activo = false;
        $categoria->save();

        return $this->noContentResponse('Categoría eliminada');
    }
}
