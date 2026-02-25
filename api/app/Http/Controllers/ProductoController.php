<?php

namespace App\Http\Controllers;

use App\Http\Traits\ApiResponseTrait;
use App\Models\Producto;
use App\Models\ProductoImagen;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductoController extends Controller
{
    use ApiResponseTrait;

    public function index(Request $request): JsonResponse
    {
        $query = Producto::with(['categorias', 'colores', 'imagenes'])
            ->where('activo', true);

        if ($request->has('categoria')) {
            $query->whereHas('categorias', function ($q) use ($request) {
                $q->where('categorias.codigo', $request->categoria);
            });
        }

        $productos = $query->orderBy('created_at', 'desc')->get();

        return $this->successResponse($productos);
    }

    public function show(string $codigo): JsonResponse
    {
        $producto = Producto::with(['categorias', 'colores', 'imagenes'])
            ->where('codigo', $codigo)
            ->where('activo', true)
            ->first();

        if (!$producto) {
            return $this->notFoundResponse('Producto no encontrado');
        }

        return $this->successResponse($producto);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'codigo' => 'required|string|max:20|unique:productos,codigo',
            'nombre' => 'required|string|max:100',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categorias' => 'nullable|array',
            'categorias.*' => 'integer|exists:categorias,id_categ',
            'colores' => 'nullable|array',
            'colores.*' => 'integer|exists:colores,id_color',
            'imagenes' => 'nullable|array',
            'imagenes.*' => 'image|max:2048',
        ]);

        return DB::transaction(function () use ($request) {
            $producto = Producto::create($request->only([
                'codigo', 'nombre', 'descripcion', 'precio', 'stock',
            ]));

            if ($request->has('categorias')) {
                $producto->categorias()->attach($request->categorias);
            }

            if ($request->has('colores')) {
                $producto->colores()->attach($request->colores);
            }

            if ($request->hasFile('imagenes')) {
                foreach ($request->file('imagenes') as $imagen) {
                    $dir = 'imgs-productos/' . $producto->codigo;
                    $nombre = $imagen->getClientOriginalName();
                    $path = $imagen->storeAs($dir, $nombre, 'public');

                    ProductoImagen::create([
                        'id_prod' => $producto->id_prod,
                        'path_img' => $path,
                        'nombre' => $nombre,
                    ]);
                }
            }

            $producto->load(['categorias', 'colores', 'imagenes']);

            return $this->createdResponse($producto);
        });
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return $this->notFoundResponse('Producto no encontrado');
        }

        $request->validate([
            'codigo' => 'sometimes|string|max:20|unique:productos,codigo,' . $producto->id_prod . ',id_prod',
            'nombre' => 'sometimes|string|max:100',
            'descripcion' => 'nullable|string',
            'precio' => 'sometimes|numeric|min:0',
            'stock' => 'sometimes|integer|min:0',
            'categorias' => 'nullable|array',
            'categorias.*' => 'integer|exists:categorias,id_categ',
            'colores' => 'nullable|array',
            'colores.*' => 'integer|exists:colores,id_color',
            'imagenes' => 'nullable|array',
            'imagenes.*' => 'image|max:2048',
        ]);

        return DB::transaction(function () use ($request, $producto) {
            $producto->update($request->only([
                'codigo', 'nombre', 'descripcion', 'precio', 'stock',
            ]));

            if ($request->has('categorias')) {
                $producto->categorias()->sync($request->categorias);
            }

            if ($request->has('colores')) {
                $producto->colores()->sync($request->colores);
            }

            if ($request->hasFile('imagenes')) {
                foreach ($request->file('imagenes') as $imagen) {
                    $dir = 'imgs-productos/' . $producto->codigo;
                    $nombre = $imagen->getClientOriginalName();
                    $path = $imagen->storeAs($dir, $nombre, 'public');

                    ProductoImagen::create([
                        'id_prod' => $producto->id_prod,
                        'path_img' => $path,
                        'nombre' => $nombre,
                    ]);
                }
            }

            $producto->load(['categorias', 'colores', 'imagenes']);

            return $this->successResponse($producto, 'Producto actualizado');
        });
    }

    public function destroy(string $id): JsonResponse
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return $this->notFoundResponse('Producto no encontrado');
        }

        $producto->activo = false;
        $producto->save();

        return $this->noContentResponse('Producto eliminado');
    }
}
