<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Client;
use Illuminate\Http\Request;

class ContactController extends Controller
{
   
    public function index()
    {
       
        $contacts = Contact::with('client')  // Add client relationship
            ->when(!auth()->user()->hasRole('Admin'), function ($query) {
                return $query->whereHas('client', function ($q) {
                    $q->where('created_by', auth()->id());
                });
            })
            ->paginate(10);

        return response()->json($contacts);
    }

    
    public function create()
    {
        return response()->json(Contact::all());
    }

   
    private function validateContact(Request $request)
    {
    return $request->validate([
        'client_id' => 'required|exists:clients,id',
        'contact_name' => 'required|string',
        'contact_email' => 'nullable|string|email',
        'contact_phone' => 'nullable|string',
    ]);
    }


    public function store(Request $request, Contact $contact)
    {
        $validated = $this->validateContact($request);
        
        // Check if user has permission to add contact to this client
        $client = Client::findOrFail($validated['client_id']);
        $this->authorize('update', $client);

        $contact = Contact::create($validated);
        return response()->json($contact->load('client'), 201);
    }

    public function update(Request $request, Contact $contact)
    {
       
        $this->validateContact($request);
    
       
        $contact->update($request->all());
        return response()->json($contact);
    }
    


    public function show(Contact $contact)
    {
        $this->authorize('view', $contact->client);
        return response()->json($contact->load('client'));
    }

}