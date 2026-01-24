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
            [
                'username' => 'admin',
                'lname' => 'ZAPANTA',
                'fname' => 'JEZEL',
                'mname' => '',
                'email' => 'admin@publication.org',
                'password' => Hash::make('a'),
                'role' => 'ADMIN',
            ],

            [
                'username' => 'user',
                'lname' => 'KAAMINO',
                'fname' => 'MELDHE',
                'mname' => '',
                'email' => 'staff@publication.org',
                'password' => Hash::make('a'),
                'role' => 'STAFF',
            ],

        ];

        \App\Models\User::insertOrIgnore($users);
    }
}
