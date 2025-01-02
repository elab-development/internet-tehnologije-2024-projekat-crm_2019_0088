<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
   
    public function index()
    {
        return response()->json(Contact::all());
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
        $this->validateContact($request);

        $contact = Contact::create($request->all());
        return response()->json($contact, 201);
    }

    public function update(Request $request, Contact $contact)
    {
       
        $this->validateContact($request);
    
       
        $contact->update($request->all());
        return response()->json($contact);
    }
    


    public function show($id)
    {
        $contact = Contact::find($id);
        if (!$contact) {
            return response()->json(['message' => 'Contact not found'], 404);
        }
        return response()->json($contact);
    }

}