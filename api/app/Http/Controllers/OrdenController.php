<?php

namespace App\Http\Controllers;

use App\Http\Traits\ApiResponseTrait;
use App\Models\DetalleOrden;
use App\Models\Orden;
use App\Models\Producto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrdenController extends Controller
{
    use ApiResponseTrait;

    public function index(): JsonResponse
    {
        $ordenes = Orden::with(['usuario:id_usuario,email', 'detalles.producto:id_prod,codigo,nombre'])
            ->where('activo', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return $this->successResponse($ordenes);
    }

    public function show(string $id): JsonResponse
    {
        $orden = Orden::with(['usuario:id_usuario,email', 'detalles.producto:id_prod,codigo,nombre,precio'])
            ->where('activo', true)
            ->find($id);

        if (!$orden) {
            return $this->notFoundResponse('Orden no encontrada');
        }

        return $this->successResponse($orden);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.id_prod' => 'required|integer|exists:productos,id_prod',
            'items.*.cantidad' => 'required|integer|min:1',
            'nombre_envio' => 'required|string|max:200',
            'direccion_envio' => 'required|string|max:300',
            'telefono_envio' => 'required|string|max:30',
            'email_envio' => 'nullable|email|max:100',
            'notas' => 'nullable|string',
        ]);

        return DB::transaction(function () use ($request) {
            $total = 0;
            $detalles = [];

            foreach ($request->items as $item) {
                $producto = Producto::where('id_prod', $item['id_prod'])
                    ->where('activo', true)
                    ->first();

                if (!$producto) {
                    return $this->errorResponse("Producto {$item['id_prod']} no encontrado", null, 422);
                }

                if ($producto->stock < $item['cantidad']) {
                    return $this->errorResponse("Stock insuficiente para '{$producto->nombre}'", null, 422);
                }

                $subtotal = $producto->precio * $item['cantidad'];
                $total += $subtotal;

                $detalles[] = [
                    'id_prod' => $producto->id_prod,
                    'cantidad' => $item['cantidad'],
                    'precio_unitario' => $producto->precio,
                    'subtotal' => $subtotal,
                ];

                $producto->decrement('stock', $item['cantidad']);
            }

            $orden = Orden::create([
                'id_usuario' => $request->user()->id_usuario,
                'total' => $total,
                'nombre_envio' => $request->nombre_envio,
                'direccion_envio' => $request->direccion_envio,
                'telefono_envio' => $request->telefono_envio,
                'email_envio' => $request->email_envio,
                'notas' => $request->notas,
            ]);

            foreach ($detalles as $detalle) {
                $detalle['id_orden'] = $orden->id_orden;
                DetalleOrden::create($detalle);
            }

            $orden->load('detalles.producto:id_prod,codigo,nombre');

            return $this->createdResponse($orden, 'Orden creada exitosamente');
        });
    }

    public function misOrdenes(Request $request): JsonResponse
    {
        $ordenes = Orden::with('detalles.producto:id_prod,codigo,nombre')
            ->where('id_usuario', $request->user()->id_usuario)
            ->where('activo', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return $this->successResponse($ordenes);
    }

    public function cambiarEstado(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'estado' => 'required|in:PENDIENTE,CONFIRMADA,ENVIADA,ENTREGADA,CANCELADA',
        ]);

        $orden = Orden::find($id);

        if (!$orden) {
            return $this->notFoundResponse('Orden no encontrada');
        }

        $orden->estado = $request->estado;
        $orden->save();

        return $this->successResponse($orden, 'Estado actualizado');
    }
}
