<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!$request->user() || !in_array($request->user()->role->name, $roles)) {
            return response()->json([
                'message' => 'Nemate dozvolu za pristup ovom resursu'
            ], 403);
        }

        return $next($request);
    }
}
