<?php

namespace App\Http\Controllers;

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
    public function register()
    {
 
        $data = request()->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
        ]);

        $user = User::create($data);
        $token = $user->createToken('auth_token')->plainTextToken;
        
        return response()->json(['message' => 'User created successfully', 'token' => $token], 201);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function login()
    {
        $data = request()->validate([
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        if (!Auth::attempt($data)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = auth()->user()->createToken('auth_token')->plainTextToken;
        return response()->json(['message' => 'Login successful', 'token' => $token], 200);
    }


    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json(['message' => 'Logout successful'], 200);
    }

   
    public function show($id)
    {
        //
    }

    
}
