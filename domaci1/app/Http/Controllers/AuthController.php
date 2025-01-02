<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id, // Add logic for role assignment
        ]);

        return response()->json($user, 201);
    }

    
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|exists:users,email',
            'password' => 'required|string|min:8',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            return response()->json(['token' => $user->createToken('API Token')->plainTextToken]);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

   
    public function logout(Request $request)
    {
        // Brisanje svih tokena korisnika
        
        $request->user()->tokens->each->delete();
        return response()->json(['message' => 'Logged out']);
    }

    public function show(User $user)
    {
        return response()->json($user);
    }

    public function destroy(User $user) 
    {
        $user->tokens()->delete();
        $user->delete();
        return response()->json(['message' => 'Korisnik je uspešno obrisan']);
    }


}