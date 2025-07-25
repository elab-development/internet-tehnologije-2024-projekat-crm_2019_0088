<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('description')->nullable();
            $table->timestamps();
        });
        
        // Insert default roles
        DB::table('roles')->insert([
            ['id' => 1, 'name' => 'Admin', 'description' => 'Full access to all features', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'name' => 'User', 'description' => 'Basic user with dashboard and settings access only', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'name' => 'Client', 'description' => 'Client with view access but cannot create clients/invoices', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};