<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\InvoiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix('api')->group(function () {

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('clients', ClientController::class);
    Route::get('clients/{client}/contacts', [ClientController::class, 'getContacts']);
    Route::get('clients/{client}/invoices', [ClientController::class, 'getInvoices']);

         // Contact routes
    Route::apiResource('contacts', ContactController::class);

         // Invoice routes
    Route::apiResource('invoices', InvoiceController::class);
 
         // Admin only routes
    Route::middleware('role:Admin')->group(function () {
        Route::get('/users', [AuthController::class, 'index']);
        Route::delete('/users/{user}', [AuthController::class, 'destroy']);
    });

});

});
