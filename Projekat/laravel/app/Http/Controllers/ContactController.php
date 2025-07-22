<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        // Prikaz svih kontakata, sa povezanim klijentom
        return Contact::with('client')->get();
    }

    public function store(Request $request)
    {
        // Validacija podataka
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'contact_name' => 'required|string|max:255',
            'contact_email' => 'nullable|email|max:255',
            'contact_phone' => 'nullable|string|max:50',
        ]);

        $contact = Contact::create($validated);

        return response()->json(['success' => true, 'contact' => $contact], 201);
    }

    public function show($id)
    {
        // Prikaz pojedinacnog kontakta sa klijentom
        $contact = Contact::with('client')->findOrFail($id);
        return response()->json($contact);
    }

    public function update(Request $request, $id)
    {
        $contact = Contact::findOrFail($id);

        $validated = $request->validate([
            'contact_name' => 'sometimes|required|string|max:255',
            'contact_email' => 'nullable|email|max:255',
            'contact_phone' => 'nullable|string|max:50',
        ]);

        $contact->update($validated);

        return response()->json(['success' => true, 'contact' => $contact]);
    }

    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return response()->json(['success' => true]);
    }
}
