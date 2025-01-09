<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
  
    public function index()
    {

       

        $clients = Client::with(['contacts', 'invoices'])
            ->when(!auth()->user()->hasRole('Admin'), function ($query) {
                return $query->where('created_by', auth()->id());
            })
            ->orderBy('created_at', 'desc')  // Add ordering
            ->paginate(10);  // Add pagination
    
            
        return response()->json($clients);

        //return response()->json(Client::with('contacts')->get());
    }

    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255'
        ]);

        $validated['created_by'] = auth()->id();
        $client = Client::create($validated);

        return response()->json($client->load(['contacts', 'invoices']), 201);
    }

    public function update(Request $request, Client $client)
    {
        $this->authorize('update', $client);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email,' . $client->id,
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255'
        ]);

        $client->update($validated);
        return response()->json($client);
    }

    public function show(Client $client)
    {
        $this->authorize('view', $client);
        return response()->json($client->load(['contacts', 'invoices']));
    }

    public function destroy(Client $client)
    {
        $this->authorize('delete', $client);
        $client->delete();
        return response()->json(['message' => 'Client deleted successfully']);
    }


    
    public function getContacts(Client $client)
    {
        $this->authorize('view', $client);
        return response()->json($client->contacts);
    }

    public function getInvoices(Client $client)
    {
        $this->authorize('view', $client);
        return response()->json($client->invoices);
    }
    

    
}
