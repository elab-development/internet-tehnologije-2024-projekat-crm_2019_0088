<?php
namespace Database\Seeders;

use App\Models\Client;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run()
    {

        $roles = [
            ['name' => 'Admin'],
            ['name' => 'User'],
            ['name' => 'Client'],
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate($role);
        }

        // Dodajte uloge
        $adminRole = Role::create(['name' => 'Admin']);
        $userRole = Role::create(['name' => 'User']);
        $clientRole = Role::create(['name' => 'Client']);

        Contact::create([
            
        ]);
        //Dodavanje klijenata
        Client::create([
            'name' => 'Nikola P',
            'email' => 'nikola@example.com',
            'phone' => '061 1233 241',
            'company' => 'Sony',
        ]);
        Client::create([
            'name' => 'Nemanja P',
            'email' => 'nemanja@example.com',
            'phone' => '061 1111 241',
            'company' => 'Nvidia',
        ]);
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