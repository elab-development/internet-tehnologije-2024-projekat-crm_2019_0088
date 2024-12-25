<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;


class RolesTableSeeder extends Seeder
{
    public function run()
    {
        Role::truncate();

        $roles = ['Admin', 'Manager', 'Client'];

    foreach ($roles as $role) {
        Role::firstOrCreate(['name' => $role]);
    }
    }
}
