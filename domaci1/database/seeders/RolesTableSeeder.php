<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;

use Illuminate\Database\Seeder;


class RolesTableSeeder extends Seeder
{
    public function run()
    {
        // Dodajte uloge
        $adminRole = Role::create(['name' => 'Admin']);
        $userRole = Role::create(['name' => 'User']);
        $clientRole = Role::create(['name' => 'Client']);

        // Dodajte korisnike sa dodeljenim rolama
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('adminpassword'),
            'role_id' => $adminRole->id,
        ]);

        User::create([
            'name' => 'Regular User',
            'email' => 'user@example.com',
            'password' => bcrypt('userpassword'),
            'role_id' => $userRole->id,
        ]);

        User::create([
            'name' => 'Client User',
            'email' => 'client@example.com',
            'password' => bcrypt('clientpassword'),
            'role_id' => $clientRole->id,
        ]);
    }
}
