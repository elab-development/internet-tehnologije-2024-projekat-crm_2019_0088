<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    // Prikazivanje svih kontakata
    public function index()
    {
        return Contact::all();
    }

    // Kreiranje novog kontakta
    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'phone' => 'nullable|string',
            'email' => 'nullable|email',
        ]);

        $contact = Contact::create($validated);

        return response()->json($contact, 201);
    }

    // Prikazivanje jednog kontakta
    public function show($id)
    {
        $contact = Contact::findOrFail($id);
        return response()->json($contact);
    }

    // Ažuriranje postojećeg kontakta
    public function update(Request $request, $id)
    {
        $contact = Contact::findOrFail($id);

        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'phone' => 'nullable|string',
            'email' => 'nullable|email',
        ]);

        $contact->update($validated);

        return response()->json($contact);
    }

    // Brisanje kontakta
    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return response()->json(null, 204);
    }
}
