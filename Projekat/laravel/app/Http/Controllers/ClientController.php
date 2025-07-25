<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $user->load('role');

        // Check if user can view clients
        if (!in_array($user->role->name, ['Admin', 'Client'])) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $query = Client::with('creator');

        // If user is not admin, only show clients they created
        if ($user->role->name !== 'Admin') {
            $query->where('created_by', $user->id);
        }

        $clients = $query->get();

        return response()->json($clients);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $user->load('role');

        // Only admins can create clients
        if ($user->role->name !== 'Admin') {
            return response()->json(['error' => 'Unauthorized to create clients'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'status' => 'in:Active,Inactive,Pending',
        ]);

        $validated['created_by'] = $user->id;
        $validated['status'] = $validated['status'] ?? 'Active';

        $client = Client::create($validated);
        $client->load('creator');

        return response()->json([
            'success' => true,
            'client' => $client
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $user = $request->user();
        $user->load('role');

        // Check if user can view clients
        if (!in_array($user->role->name, ['Admin', 'Client'])) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $client = Client::with('creator')->findOrFail($id);

        // If user is not admin, only allow viewing their own clients
        if ($user->role->name !== 'Admin' && $client->created_by !== $user->id) {
            return response()->json(['error' => 'Unauthorized to view this client'], 403);
        }

        return response()->json($client);
    }

    public function update(Request $request, $id)
    {
        $user = $request->user();
        $user->load('role');

        // Only admins can update clients
        if ($user->role->name !== 'Admin') {
            return response()->json(['error' => 'Unauthorized to update clients'], 403);
        }

        $client = Client::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email,' . $client->id,
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'status' => 'in:Active,Inactive,Pending',
        ]);

        $client->update($validated);
        $client->load('creator');

        return response()->json([
            'success' => true,
            'client' => $client
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        $user->load('role');

        // Only admins can delete clients
        if ($user->role->name !== 'Admin') {
            return response()->json(['error' => 'Unauthorized to delete clients'], 403);
        }

        $client = Client::findOrFail($id);
        $client->delete();

        return response()->json([
            'success' => true,
            'message' => 'Client deleted successfully'
        ]);
    }
}