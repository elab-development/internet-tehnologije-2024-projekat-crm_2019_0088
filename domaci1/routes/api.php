<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\InvoiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Klijenti API rute
    Route::apiResource('clients', ClientController::class);
    Route::get('clients/{client}/contacts', [ClientController::class, 'getContacts'])->name('clients.contacts');
    Route::get('clients/{client}/invoices', [ClientController::class, 'getInvoices'])->name('clients.invoices');
    
    // Kontakti API rute
    Route::apiResource('contacts', ContactController::class);
    
    // Fakture API rute
    Route::apiResource('invoices', InvoiceController::class);

    // Admin samo rute
    Route::middleware('role:Admin')->group(function () {
        Route::get('/users', [AuthController::class, 'index']);
        Route::get('/users/{user}', [AuthController::class, 'show']);
        Route::put('/users/{user}', [AuthController::class, 'update']);
        Route::delete('/users/{user}', [AuthController::class, 'destroy']);
        Route::delete('/clients/{client}', [ClientController::class, 'destroy']);
    });

    // User samo rute
    Route::middleware('role:User')->group(function () {
        Route::post('/clients', [ClientController::class, 'store']);
        Route::put('/clients/{client}', [ClientController::class, 'update']);
    });

    // Ako si implementirao kreiranje kontakta, definiši i njegovu rutu:
    Route::post('/contacts', [ContactController::class, 'store']);
});
