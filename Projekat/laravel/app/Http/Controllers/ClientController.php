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

  
    // public function store(Request $request)
    // {
    //     $validated = $request->validate([
    //         'name' => 'required|string|max:255',
    //         'email' => 'required|email|unique:clients,email',
    //         'phone' => 'nullable|string|max:20',
    //         'company' => 'nullable|string|max:255'
    //     ]);

    //     $validated['created_by'] = auth()->id();
    //     $client = Client::create($validated);

    //     return response()->json($client->load(['contacts', 'invoices']), 201);
    // }

    // public function update(Request $request, Client $client)
    // {
    //     $this->authorize('update', $client);
        
    //     $validated = $request->validate([
    //         'name' => 'required|string|max:255',
    //         'email' => 'required|email|unique:clients,email,' . $client->id,
    //         'phone' => 'nullable|string|max:20',
    //         'company' => 'nullable|string|max:255'
    //     ]);

    //     $client->update($validated);
    //     return response()->json($client);
    // }

    // public function show(Client $client)
    // {
    //     $this->authorize('view', $client);
    //     return response()->json($client->load(['contacts', 'invoices']));
    // }

    // public function destroy(Client $client)
    // {
    //     $this->authorize('delete', $client);
    //     $client->delete();
    //     return response()->json(['message' => 'Client deleted successfully']);
    // }


    
    // public function getContacts(Client $client)
    // {
    //     $this->authorize('view', $client);
    //     return response()->json($client->contacts);
    // }

    // public function getInvoices(Client $client)
    // {
    //     $this->authorize('view', $client);
    //     return response()->json($client->invoices);
    // }
    


}
