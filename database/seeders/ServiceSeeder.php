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
                'code' => 'BOR',
                'name' => 'Budget Obligation Request',
                'slug' => Str::slug('Budget Obligation Request'),
                'description' => '',
                'active' => 1,
            ],
            [
                'code' => 'PRBC',
                'name' => 'Purchase Request Budget Certification',
                'slug' => Str::slug('Purchase Request Budget Certification'),
                'description' => '',
                'active' => 1,
            ],
            [
                'code' => 'DVBC',
                'name' => 'Disbursement Voucher Budget Check',
                'slug' => Str::slug('Disbursement Voucher Budget Check'),
                'description' => '',
                'active' => 1,
            ],
            [
                'code' => 'CBA',
                'name' => 'Certificate of Budget Availability',
                'slug' => Str::slug('Certificate of Budget Availability'),
                'description' => '',
                'active' => 1,
            ],
            [
                'code' => 'REAL',
                'name' => 'Budget Realignment / Reprogramming Request',
                'slug' => Str::slug('Budget Realignment / Reprogramming Request'),
                'description' => '',
                'active' => 1,
            ],
            [
                'code' => 'SBR',
                'name' => 'Special Budget / Emergency Fund Request',
                'slug' => Str::slug('Special Budget / Emergency Fund Request'),
                'description' => '',
                'active' => 1,
            ],


        ];

        \App\Models\Service::insertOrIgnore($data);
    }
}
