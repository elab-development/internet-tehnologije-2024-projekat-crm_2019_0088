<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index() {
        return Client::all();
    }
    
    public function store(Request $request) {
        $client = Client::create($request->all());
        return response()->json(['success' => true, 'client' => $client]);
    }
    
    public function show($id) {
        return Client::findOrFail($id);
    }
    
    public function update(Request $request, $id) {
        $client = Client::findOrFail($id);
        $client->update($request->all());
        return response()->json(['success' => true, 'client' => $client]);
    }
    
    public function destroy($id) {
        Client::destroy($id);
        return response()->json(['success' => true]);
    }
}
