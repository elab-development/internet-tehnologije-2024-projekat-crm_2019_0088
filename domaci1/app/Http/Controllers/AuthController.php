<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Role;
use Illuminate\Container\Attributes\Auth as AttributesAuth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'company' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'role' => 'required|in:admin,user,client',
        ]);

        // Get role ID based on role name
        $role = Role::where('name', ucfirst($request->role))->first();
        if (!$role) {
            return response()->json(['error' => 'Invalid role specified'], 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $role->id,
            // 'company' => $request->company,
           // 'phone' => $request->phone,
        ]);

        // Load the role relationship
        $user->load('role');

        // Create token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'company' => $user->company,
                'phone' => $user->phone,
                'role' => $user->role->name,
                'permissions' => $this->getUserPermissions($user),
            ],
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

    $user = User::where('email', $request->email)->first();
        $user->load('role');
        
        // Revoke all existing tokens and create new one
        $user->tokens()->delete();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'company' => $user->company,
                'phone' => $user->phone,
                'role' => $user->role->name,
                'permissions' => $this->getUserPermissions($user),
            ],
            'token' => $token
        ]);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        $user->load('role');

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'company' => $user->company,
            'phone' => $user->phone,
            'role' => $user->role->name,
            'permissions' => $this->getUserPermissions($user),
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        
        return response()->json([
            'message' => 'Logout successful'
        ]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        $user = $request->user();

        // Check if current password is correct
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'errors' => [
                    'current_password' => ['The current password is incorrect.']
                ]
            ], 422);
        }

        // Update password
        $user->update([
            'password' => Hash::make($request->new_password)
        ]);

        return response()->json([
            'message' => 'Password updated successfully'
        ]);
    }

    private function getUserPermissions($user)
    {
        $role = $user->role->name;
        
        $permissions = [
            'canViewDashboard' => true,
            'canViewSettings' => true,
            'canViewClients' => false,
            'canCreateClients' => false,
            'canEditClients' => false,
            'canDeleteClients' => false,
            'canViewInvoices' => false,
            'canCreateInvoices' => false,
            'canEditInvoices' => false,
            'canDeleteInvoices' => false,
        ];

        switch ($role) {
            case 'Admin':
                $permissions = array_merge($permissions, [
                    'canViewClients' => true,
                    'canCreateClients' => true,
                    'canEditClients' => true,
                    'canDeleteClients' => true,
                    'canViewInvoices' => true,
                    'canCreateInvoices' => true,
                    'canEditInvoices' => true,
                    'canDeleteInvoices' => true,
                ]);
                break;
            case 'Client':
                $permissions = array_merge($permissions, [
                    'canViewClients' => true,
                    'canViewInvoices' => false,
                ]);
                break;
            case 'User':
                // Only dashboard and settings
                break;
        }

        return $permissions;
    }
}