<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceStepSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'service_id' => 1,
                'name' => 'Budget Obligation Request',
                'step_order' => 1,
                'sla_minutes' => null
            ],
            [
                'service_id' => 1,
                'name' => 'Check Completeness of Documents',
                'step_order' => 2,
                'sla_minutes' => null
            ],
            [
                'service_id' => 1,
                'name' => 'Check Budget Availability',
                'step_order' => 3,
                'sla_minutes' => null
            ],
            [
                'service_id' => 1,
                'name' => 'Encode in Budget System',
                'step_order' => 4,
                'sla_minutes' => null
            ],
            [
                'service_id' => 1,
                'name' => 'Review by Budget Officer',
                'step_order' => 5,
                'sla_minutes' => null
            ],
            [
                'service_id' => 1,
                'name' => 'Approval by City Budget Officer',
                'step_order' => 6,
                'sla_minutes' => null
            ],
            [
                'service_id' => 1,
                'name' => 'Forward to Accounting',
                'step_order' => 7,
                'sla_minutes' => null
            ],





            [
                'service_id' => 2,
                'name' => 'Receive Purchase Request',
                'step_order' => 1,
                'sla_minutes' => null
            ],
            [
                'service_id' => 2,
                'name' => 'Verify PR and Attachments',
                'step_order' => 2,
                'sla_minutes' => null
            ],
            [
                'service_id' => 2,
                'name' => 'Check Allotment / Fund Source',
                'step_order' => 3,
                'sla_minutes' => null
            ],
            [
                'service_id' => 2,
                'name' => 'Encode Certification',
                'step_order' => 4,
                'sla_minutes' => null
            ],
            [
                'service_id' => 2,
                'name' => 'Review by Budget Officer',
                'step_order' => 5,
                'sla_minutes' => null
            ],
            [
                'service_id' => 2,
                'name' => 'Sign & Release to Requesting Office',
                'step_order' => 6,
                'sla_minutes' => null
            ],




            [
                'service_id' => 3,
                'name' => 'Receive Disbursement Voucher',
                'step_order' => 1,
                'sla_minutes' => null
            ],
            [
                'service_id' => 3,
                'name' => 'Validate Supporting Documents',
                'step_order' => 2,
                'sla_minutes' => null
            ],
            [
                'service_id' => 3,
                'name' => 'Check Fund Availability',
                'step_order' => 3,
                'sla_minutes' => null
            ],
            [
                'service_id' => 3,
                'name' => 'Encode DV in System',
                'step_order' => 4,
                'sla_minutes' => null
            ],
            [
                'service_id' => 3,
                'name' => 'Review by Budget Officer',
                'step_order' => 5,
                'sla_minutes' => null
            ],
            [
                'service_id' => 3,
                'name' => 'Approve and Endorse to Accounting',
                'step_order' => 6,
                'sla_minutes' => null
            ],


            [
                'service_id' => 4,
                'name' => 'Receive Request',
                'step_order' => 1,
                'sla_minutes' => null
            ],
            [
                'service_id' => 4,
                'name' => 'Verify Supporting Documents',
                'step_order' => 2,
                'sla_minutes' => null
            ],
            [
                'service_id' => 4,
                'name' => 'Check Budget Line Item',
                'step_order' => 3,
                'sla_minutes' => null
            ],
            [
                'service_id' => 4,
                'name' => 'Prepare Certificate',
                'step_order' => 4,
                'sla_minutes' => null
            ],
            [
                'service_id' => 4,
                'name' => 'Review by Budget Officer',
                'step_order' => 5,
                'sla_minutes' => null
            ],
            [
                'service_id' => 4,
                'name' => 'Sign & Release',
                'step_order' => 6,
                'sla_minutes' => null
            ],



            [
                'service_id' => 5,
                'name' => 'Receive Request',
                'step_order' => 1,
                'sla_minutes' => null
            ],
            [
                'service_id' => 5,
                'name' => 'Validate Legal Basis',
                'step_order' => 2,
                'sla_minutes' => null
            ],
            [
                'service_id' => 5,
                'name' => 'Analyze Impact on Programs',
                'step_order' => 3,
                'sla_minutes' => null
            ],
            [
                'service_id' => 5,
                'name' => 'Prepare Realignment Document',
                'step_order' => 4,
                'sla_minutes' => null
            ],
            [
                'service_id' => 5,
                'name' => 'Review by Budget Officer',
                'step_order' => 5,
                'sla_minutes' => null
            ],
            [
                'service_id' => 5,
                'name' => 'Approval',
                'step_order' => 6,
                'sla_minutes' => null
            ],
            [
                'service_id' => 5,
                'name' => 'Endorse to Sanggunian / Accounting',
                'step_order' => 7,
                'sla_minutes' => null
            ],



            [
                'service_id' => 6,
                'name' => 'Receive Request',
                'step_order' => 1,
                'sla_minutes' => null
            ],
            [
                'service_id' => 6,
                'name' => 'Validate Justification and Urgency',
                'step_order' => 2,
                'sla_minutes' => null
            ],
            [
                'service_id' => 6,
                'name' => 'Check Available Funds',
                'step_order' => 3,
                'sla_minutes' => null
            ],
            [
                'service_id' => 6,
                'name' => 'Prepare Budget Action',
                'step_order' => 4,
                'sla_minutes' => null
            ],
            [
                'service_id' => 6,
                'name' => 'Review by Budget Officer',
                'step_order' => 5,
                'sla_minutes' => null
            ],
            [
                'service_id' => 6,
                'name' => 'Approval',
                'step_order' => 6,
                'sla_minutes' => null
            ],
            [
                'service_id' => 6,
                'name' => 'Release / Endorse',
                'step_order' => 7,
                'sla_minutes' => null
            ],


        ];

        \App\Models\ServiceStep::insertOrIgnore($data);
    }
}
