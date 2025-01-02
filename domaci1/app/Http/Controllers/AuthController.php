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

    public function show($id)
    {
        try {
            $user = User::with('role')->findOrFail($id);
            
            return response()->json([
                'status' => 'success',
                'user' => $user
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Korisnik nije pronađen',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            
            // Provera da li korisnik pokušava da obriše sam sebe
            if ($user->id === auth()->id()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Ne možete obrisati svoj nalog'
                ], 403);
            }

            DB::beginTransaction();
            
            // Prvo brišemo sve tokene korisnika
            $user->tokens()->delete();
            
            // Zatim brišemo korisnika
            $user->delete();
            
            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Korisnik je uspešno obrisan'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Greška pri brisanju korisnika',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}