<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
  
    public function index()
    {
        return response()->json(Client::with('contacts')->get());
    }

    
    public function create()
    {
        return response()->json(new Client());
    }

    
    public function store(Request $request,$clientId)
    {
        $client = Client::findOrFail($clientId);
        $contact = $client->contacts()->create($request->all());
        return response()->json($contact, 201);
    }

    public function update(Request $request, $clientId)
    {
        $client = Client::findOrFail($clientId);
        $client->update($request->all());
        return response()->json($client);
    }

    public function show($clientId)
    {
        $client = Client::findOrFail($clientId);
        return response()->json($client);
    }

    public function destroy($clientId)
    {
        $client = Client::findOrFail($clientId);
        $client->delete();
        return response()->json(['message' => 'Client deleted successfully']);
    }
}
