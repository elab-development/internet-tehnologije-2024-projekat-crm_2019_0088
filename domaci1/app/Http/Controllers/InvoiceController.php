<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $user->load('role');

        // Check if user can view invoices
        if (!in_array($user->role->name, ['Admin', 'Client'])) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $query = Invoice::with(['client', 'creator']);

        // If user is not admin, only show invoices they created
        if ($user->role->name !== 'Admin') {
            $query->where('created_by', $user->id);
        }

        $invoices = $query->paginate(10);

        return response()->json($invoices);
    }

    public function show(Request $request, $invoiceId)
    {
        $user = $request->user();
        $user->load('role');

        // Check if user can view invoices
        if (!in_array($user->role->name, ['Admin', 'Client'])) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $invoice = Invoice::with(['client', 'creator'])->findOrFail($invoiceId);

        // If user is not admin, only allow viewing their own invoices
        if ($user->role->name !== 'Admin' && $invoice->created_by !== $user->id) {
            return response()->json(['error' => 'Unauthorized to view this invoice'], 403);
        }

        return response()->json($invoice);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $user->load('role');

        // Only admins can create invoices
        if ($user->role->name !== 'Admin') {
            return response()->json(['error' => 'Unauthorized to create invoices'], 403);
        }

        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'amount' => 'required|numeric|min:0',
            'tax_amount' => 'nullable|numeric|min:0',
            'issue_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:issue_date',
            'notes' => 'nullable|string',
            'items' => 'nullable|array',
            'status' => 'in:Draft,Sent,Paid,Overdue,Cancelled',
        ]);

        // Generate invoice number
        $validated['invoice_number'] = Invoice::generateInvoiceNumber();
        $validated['created_by'] = $user->id;
        $validated['tax_amount'] = $validated['tax_amount'] ?? 0;
        $validated['total_amount'] = $validated['amount'] + $validated['tax_amount'];
        $validated['status'] = $validated['status'] ?? 'Draft';

        $invoice = Invoice::create($validated);
        $invoice->load(['client', 'creator']);

        return response()->json($invoice, 201);
    }

    public function update(Request $request, $invoiceId)
    {
        $user = $request->user();
        $user->load('role');

        // Only admins can update invoices
        if ($user->role->name !== 'Admin') {
            return response()->json(['error' => 'Unauthorized to update invoices'], 403);
        }

        $invoice = Invoice::findOrFail($invoiceId);

        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'amount' => 'required|numeric|min:0',
            'tax_amount' => 'nullable|numeric|min:0',
            'issue_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:issue_date',
            'notes' => 'nullable|string',
            'items' => 'nullable|array',
            'status' => 'required|in:Draft,Sent,Paid,Overdue,Cancelled',
        ]);

        $validated['tax_amount'] = $validated['tax_amount'] ?? 0;
        $validated['total_amount'] = $validated['amount'] + $validated['tax_amount'];

        $invoice->update($validated);
        $invoice->load(['client', 'creator']);

        return response()->json($invoice);
    }

    public function destroy(Request $request, $invoiceId)
    {
        $user = $request->user();
        $user->load('role');

        // Only admins can delete invoices
        if ($user->role->name !== 'Admin') {
            return response()->json(['error' => 'Unauthorized to delete invoices'], 403);
        }

        $invoice = Invoice::findOrFail($invoiceId);
        $invoice->delete();

        return response()->json(['message' => 'Invoice deleted successfully']);
    }
}