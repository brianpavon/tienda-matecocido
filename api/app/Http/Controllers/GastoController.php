<?php

namespace App\Http\Controllers;

use App\Enums\TipoGasto;
use App\Http\Traits\ApiResponseTrait;
use App\Models\Gasto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GastoController extends Controller
{
    use ApiResponseTrait;

    public function index(): JsonResponse
    {
        $gastos = Gasto::where('activo', true)->orderBy('fecha', 'desc')->get();

        return $this->successResponse($gastos);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'tipo' => ['required', TipoGasto::validationRule()],
            'monto' => 'required|numeric|min:0',
            'fecha' => 'required|date',
            'descripcion' => 'nullable|string|max:250',
        ]);

        $gasto = Gasto::create($request->only(['tipo', 'monto', 'fecha', 'descripcion']));

        return $this->createdResponse($gasto);
    }

    public function show(string $id): JsonResponse
    {
        $gasto = Gasto::find($id);

        if (!$gasto) {
            return $this->notFoundResponse('Gasto no encontrado');
        }

        return $this->successResponse($gasto);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $gasto = Gasto::find($id);

        if (!$gasto) {
            return $this->notFoundResponse('Gasto no encontrado');
        }

        $request->validate([
            'tipo' => ['sometimes', TipoGasto::validationRule()],
            'monto' => 'sometimes|numeric|min:0',
            'fecha' => 'sometimes|date',
            'descripcion' => 'nullable|string|max:250',
        ]);

        $gasto->update($request->only(['tipo', 'monto', 'fecha', 'descripcion']));

        return $this->successResponse($gasto, 'Gasto actualizado');
    }

    public function destroy(string $id): JsonResponse
    {
        $gasto = Gasto::find($id);

        if (!$gasto) {
            return $this->notFoundResponse('Gasto no encontrado');
        }

        $gasto->activo = false;
        $gasto->save();

        return $this->noContentResponse('Gasto eliminado');
    }
}
