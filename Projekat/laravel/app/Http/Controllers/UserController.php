<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index() {
        return User::with('role')->get();
    }
    
    public function show($id) {
        return User::with('role')->findOrFail($id);
    }
    
    public function update(Request $request, $id) {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return response()->json(['success' => true, 'user' => $user]);
    }
    
    public function destroy($id) {
        User::destroy($id);
        return response()->json(['success' => true]);
    }
}
