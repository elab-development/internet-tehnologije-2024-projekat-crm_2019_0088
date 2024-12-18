<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContactController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::apiResource('clients', ClientController::class);
Route::apiResource('contacts', ContactController::class);

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
Route::post('clients/{clientId}/contacts', [ClientController::class, 'store']);
Route::put('clients/{clientId}', [ClientController::class, 'update']);
Route::delete('clients/{clientId}', [ClientController::class, 'destroy']);
Route::get('clients/{clientId}', [ClientController::class, 'show']);

Route::post('contacts/{contactId}', [ContactController::class, 'store']);
Route::put('contacts/{contactId}', [ContactController::class, 'update']);
Route::delete('contacts/{contactId}', [ContactController::class, 'destroy']);
Route::get('contacts/{contactId}', [ContactController::class, 'show']);

});
