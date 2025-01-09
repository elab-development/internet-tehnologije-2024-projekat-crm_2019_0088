<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->string('contact_name');
            $table->string('contact_email')->nullable();
            $table->string('contact_phone',20)->nullable();
            $table->timestamps();
            $table->softDeletes();
    
            $table->index('client_id');
            $table->index('contact_email');
            $table->unique(['client_id', 'contact_email']);
        });
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contacts');
    }
};
