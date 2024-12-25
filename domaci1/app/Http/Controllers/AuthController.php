<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {

        $request -> validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => Role::where('name', 'User')->first()->id,
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;


        // Provera da li je email već zauzet
        if (User::where('email', $request->email)->exists()) {
            return response()->json(['message' => 'Email je već zauzet'], 400);
        }

        // Provera da li je lozinka dovoljno jaka
        if (strlen($request->password) < 8) {
            return response()->json(['message' => 'Lozinka mora imati minimum 8 karaktera'], 400);
        }

        // Provera da li je email u validnom formatu 
        if (!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
            return response()->json(['message' => 'Email nije u validnom formatu'], 400);
        }
        
       if (!$user) {
           return response()->json([
               'error' => 'User not authenticated.'
           ], 401);
       }
       
       
       return response()->json([
        'message' => 'User registered successfully',
        'user' => $user,
        'token' => $token
         ], 201);

    }

    
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);


        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token
        ], 200);
    }


    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }


    public function show($id)
    {
        //
    }
}
