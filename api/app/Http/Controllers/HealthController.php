<?php

namespace App\Http\Controllers;

use App\Http\Traits\ApiResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class HealthController extends Controller
{
    use ApiResponseTrait;

    public function index(): JsonResponse
    {
        try {
            DB::connection()->getPdo();

            return $this->successResponse([
                'status' => 'ok',
                'database' => 'connected',
            ]);
        } catch (\Exception $e) {
            return $this->errorResponse('Database connection failed', null, 503);
        }
    }
}
