<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Client::with('contacts')->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return response()->json(new Client());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request,$clientId)
    {
        
        $client = Client::findOrFail($clientId);
        $contact = $client->contacts()->create($request->all());
        return response()->json($contact, 201);
        
        // $request->validate([
        //     'name' => 'required|string',
        //     'email' => 'nullable|string|email',
        //     'phone' => 'nullable|string',
        //     'company' => 'nullable|string',
             
        // ]);

        // $client = Client::create($request->all());
        // return response()->json($client, 201);
    }

    public function show($clientId)
    {
        return response()->json(Client::with('contacts')->findOrFail($clientId));
    }

    public function update(Request $request, $clientId)
    {
        $client = Client::findOrFail($clientId);
        $client->update($request->all());
        return response()->json($client);
    }

    public function destroy($clientId)
    {
        $client = Client::findOrFail($clientId);
        $client->delete();
        return response()->json(['message' => 'Client deleted']);
    }
}
