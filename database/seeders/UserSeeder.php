<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $users = [
           'username' => 'staff',
            'lname' => 'Dela Cruz',
            'fname' => 'Juan',
            'mname' => 'P',
            'role' => 'STAFF',
            'password' => Hash::make('a'),
            'email_verified_at' => now(),
        ];

        \App\Models\User::insertOrIgnore($users);
    }
}
