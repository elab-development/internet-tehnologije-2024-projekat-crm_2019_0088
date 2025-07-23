<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $role = Role::create(['name' => 'Admin']);
        User::factory()->create([
        'name' => 'Admin',
        'email' => 'admin@admin.com',
        'password'=>'admin',
        'role_id' => $role->id
    ]);

        
    }
}
