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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role_id' => 'required|exists:roles,id'  // Add validation for role_id
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role_id' => $validated['role_id'],
        ]);
        $token = $user->createToken('API Token')->plainTextToken;
        return response()->json(['user' => $user, 'token' => $token], 201);
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