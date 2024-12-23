<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
  
    public function handle($request, Closure $next, $role)
    {
        if (auth()->check() && auth()->user()->role->name === $role) {
            return $next($request);
        }
    
        return response()->json(['error' => 'Unauthorized'], 403);
    }
    
}
