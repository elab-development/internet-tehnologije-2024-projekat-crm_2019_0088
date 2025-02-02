<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Client;
use Illuminate\Http\Request;

class ContactController extends Controller
{
   
    public function index()
    {
        $contacts = Contact::with('client')
            ->when(auth()->check() && !auth()->user()->hasRole('Admin'), function ($query) {
                return $query->whereHas('client', function ($q) {
                    $q->where('created_by', auth()->id());
                });
            })
            ->paginate(10);

        return response()->json($contacts);
    }

    
    public function create()
    {
        $contacts = Contact::with('client')->paginate(10);
        return response()->json($contacts);
    }

   
    private function validateContact(Request $request)
    {
        return $request->validate([
            'client_id'     => 'required|exists:clients,id',
            'contact_name'  => 'required|string',
            'contact_email' => 'nullable|string|email',
            'contact_phone' => 'nullable|string',
        ]);
    }


    public function store(Request $request)
    {
        $validated = $this->validateContact($request);
        
        // Provera da li korisnik ima pravo da ažurira klijenta kome se dodaje kontakt
        $client = Client::findOrFail($validated['client_id']);
        $this->authorize('update', $client);

        $contact = Contact::create($validated);
        $contact->load('client');

        return response()->json($contact, 201);
    }

    public function update(Request $request, Contact $contact)
    {
        $this->validateContact($request);
    
        $contact->update($request->all());
        $contact->load('client');
        
        return response()->json($contact);
    }
    


    public function show(Contact $contact)
    {
        // Učitavamo relaciju ukoliko nije već učitana
        $contact->loadMissing('client');
        $this->authorize('view', $contact->client);
        
        return response()->json($contact);
    }

}