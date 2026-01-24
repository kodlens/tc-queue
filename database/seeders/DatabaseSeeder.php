<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Service;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);


        $this->call([
            UserSeeder::class,
        ]);

        //seeder for services and steps
        $services = [
            'Budget Obligation Request (BOR)' => [
                'Receive Obligation Request',
                'Check Completeness of Documents',
                'Check Budget Availability',
                'Encode in Budget System',
                'Review by Budget Officer',
                'Approval by City Budget Officer',
                'Forward to Accounting',
            ],
            'Purchase Request Budget Certification (PRBC)' => [
                'Receive Purchase Request',
                'Verify PR and Attachments',
                'Check Allotment / Fund Source',
                'Encode Certification',
                'Review by Budget Officer',
                'Sign & Release to Requesting Office',
            ],
            'Disbursement Voucher Budget Check (DVBC)' => [
                'Receive Disbursement Voucher',
                'Validate Supporting Documents',
                'Check Fund Availability',
                'Encode DV in System',
                'Review by Budget Officer',
                'Approve and Endorse to Accounting',
            ],
            'Certificate of Budget Availability (CBA)' => [
                'Receive Request',
                'Verify Supporting Documents',
                'Check Budget Line Item',
                'Prepare Certificate',
                'Review by Budget Officer',
                'Sign & Release',
            ],
            'Budget Realignment / Reprogramming Request (REAL)' => [
                'Receive Request',
                'Validate Legal Basis',
                'Analyze Impact on Programs',
                'Prepare Realignment Document',
                'Review by Budget Officer',
                'Approval',
                'Endorse to Sanggunian / Accounting',
            ],
            'Special Budget / Emergency Fund Request (SBR)' => [
                'Receive Request',
                'Validate Justification and Urgency',
                'Check Available Funds',
                'Prepare Budget Action',
                'Review by Budget Officer',
                'Approval',
                'Release / Endorse',
            ],
        ];

        foreach ($services as $serviceName => $steps) {
            $service = Service::create(['name' => $serviceName]);

            foreach ($steps as $i => $stepName) {
                $service->steps()->create([
                    'name' => $stepName,
                    'step_order' => $i + 1
                ]);
            }
        }



    }
}
