<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    // Prikazivanje svih klijenata
    public function index()
    {
        return Client::all();
    }

    // Kreiranje novog klijenta
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:clients',
            'phone' => 'nullable|string',
        ]);

        $client = Client::create($validated);

        return response()->json($client, 201);
    }

    // Prikazivanje jednog klijenta
    public function show($id)
    {
        $client = Client::findOrFail($id);
        return response()->json($client);
    }

    // Ažuriranje postojećeg klijenta
    public function update(Request $request, $id)
    {
        $client = Client::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email,' . $client->id,
            'phone' => 'nullable|string',
        ]);

        $client->update($validated);

        return response()->json($client);
    }

    // Brisanje klijenta
    public function destroy($id)
    {
        $client = Client::findOrFail($id);
        $client->delete();

        return response()->json(null, 204);
    }
}
