<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\InvoiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public routes (no authentication required)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (authentication required)
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
    // Client routes - available to all authenticated users

    Route::apiResource('clients', ClientController::class);
    
    // Invoice routes
    Route::apiResource('invoices', InvoiceController::class);
    Route::get('invoices/export', [InvoiceController::class, 'export']);
    Route::get('/clients', [ClientController::class, 'index']);
    Route::get('/clients/{client}', [ClientController::class, 'show']);
    
    // Contact routes - available to all authenticated users
    Route::get('/contacts', [ContactController::class, 'index']);
    Route::get('/contacts/{contact}', [ContactController::class, 'show']);
    Route::post('/contacts', [ContactController::class, 'store']);
    Route::put('/contacts/{contact}', [ContactController::class, 'update']);
    Route::delete('/contacts/{contact}', [ContactController::class, 'destroy']);
    
    // Invoice routes - available to all authenticated users
    Route::get('/invoices', [InvoiceController::class, 'index']);
    Route::get('/invoices/{invoice}', [InvoiceController::class, 'show']);
    Route::post('/invoices', [InvoiceController::class, 'store']);
    Route::put('/invoices/{invoice}', [InvoiceController::class, 'update']);
    Route::delete('/invoices/{invoice}', [InvoiceController::class, 'destroy']);

    // Client relationship routes
    Route::get('/clients/{client}/contacts', [ClientController::class, 'getContacts']);
    Route::get('/clients/{client}/invoices', [ClientController::class, 'getInvoices']);

    // Admin-only routes
    Route::middleware('role:Admin')->group(function () {
        // User management
        Route::get('/users', [AuthController::class, 'index']);
        Route::get('/users/{user}', [AuthController::class, 'show']);
        Route::put('/users/{user}', [AuthController::class, 'update']);
        Route::delete('/users/{user}', [AuthController::class, 'destroy']);
        
        // Admin can delete clients
        Route::delete('/clients/{client}', [ClientController::class, 'destroy']);
    });

    // User-only routes (regular users can create/update their own clients)
    Route::middleware('role:User')->group(function () {
        Route::post('/clients', [ClientController::class, 'store']);
        Route::put('/clients/{client}', [ClientController::class, 'update']);
    });

    // Admin can also create/update clients
    Route::middleware('role:Admin')->group(function () {
        Route::post('/clients', [ClientController::class, 'store']);
        Route::put('/clients/{client}', [ClientController::class, 'update']);
    });
});