<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function index() {
        return Invoice::all();
    }
    
    public function store(Request $request) {
        $invoice = Invoice::create($request->all());
        return response()->json(['success' => true, 'invoice' => $invoice]);
    }
    
    public function show($id) {
        return Invoice::findOrFail($id);
    }
    
    public function update(Request $request, $id) {
        $invoice = Invoice::findOrFail($id);
        $invoice->update($request->all());
        return response()->json(['success' => true, 'invoice' => $invoice]);
    }
    
    public function destroy($id) {
        Invoice::destroy($id);
        return response()->json(['success' => true]);
    }
}
