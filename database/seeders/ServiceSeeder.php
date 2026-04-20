<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'code' => 'OBR',
                'name' => 'Obligation Request and Status',
                'slug' => Str::slug('Obligation Request and Status'),
                'description' => '',
                'active' => 1,
            ],
            [
                'code' => 'CAF',
                'name' => 'Certificate of Availability of Funds',
                'slug' => Str::slug('Certificate of Availability of Funds'),
                'description' => '',
                'active' => 1,
            ],
            [
                'code' => 'BBR',
                'name' => 'Barangay Budget Reviews',
                'slug' => Str::slug('Barangay Budget Reviews'),
                'description' => '',
                'active' => 1,
            ],
            [
                'code' => 'AOR',
                'name' => 'Adjustment of Obligation Request',
                'slug' => Str::slug('Adjustment of Obligation Request'),
                'description' => '',
                'active' => 1,
            ],
            [
                'code' => 'CA',
                'name' => 'Certificate of Appearance',
                'slug' => Str::slug('Certificate of Appearance'),
                'description' => '',
                'active' => 1,
            ],
            [
                'code' => 'OTHER/OTR',
                'name' => 'Other Services / OTR',
                'slug' => Str::slug('Other Services'),
                'description' => '',
                'active' => 1,
            ],


        ];

        \App\Models\Service::insertOrIgnore($data);
    }
}
