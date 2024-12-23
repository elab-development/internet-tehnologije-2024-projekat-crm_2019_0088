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
        //$user = User::create($data);
       // $token = $user->createToken('auth_token')->plainTextToken;

       $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt($request->password),
        'role_id' => Role::where('name', 'User')->first()->id, // Dodeljuje 'User' rolu
    ]);

    return response()->json(['message' => 'User registered successfully!'], 201);
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
