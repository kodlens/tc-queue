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
                'name' => 'For Review',
                'step_order' => 1,
                'sla_minutes' => null,
                'tts_text' => 'Your request for Obligation Request and Status is now for review.',
                'is_tts' => 0,
            ],
            [
                'service_id' => 1,
                'name' => 'For issuance of OBR',
                'tts_text' => 'Proceed to CCounter 5 or 6 / Issue OBR',
                'step_order' => 2,
                'sla_minutes' => null,
                'is_tts' => 1,
            ],
            [
                'service_id' => 1,
                'name' => 'For Approval (NO TTS)',
                'step_order' => 3,
                'sla_minutes' => null,
                'tts_text' => 'Counter 7 / Approval',
                'is_tts' => 0,

            ],
            [
                'service_id' => 1,
                'name' => 'Released',
                'step_order' => 4,
                'sla_minutes' => null,
                'tts_text' => 'Counter 2 / Released',
                'is_tts' => 1,
            ],



            [
                'service_id' => 2,
                'name' => 'For Review',
                'tts_text' => 'Counter 1 - Incomming/ Review Details',
                'step_order' => 1,
                'sla_minutes' => null,
                'is_tts' => 0,
            ],
            [
                'service_id' => 2,
                'name' => 'For issuance of CAF',
                'tts_text' => 'Proceed to Counter 3 / Issue CAF',
                'step_order' => 2,
                'sla_minutes' => null,
                'is_tts' => 1,
            ],
            [
                'service_id' => 2,
                'name' => 'For Approval',
                'tts_text' => 'Counter 7 / Approval',
                'step_order' => 3,
                'sla_minutes' => null,
                'is_tts' => 0
            ],
            [
                'service_id' => 2,
                'name' => 'Released',
                'tts_text' => 'Counter 2 / Released',
                'step_order' => 4,
                'sla_minutes' => null,
                'is_tts' => 1
            ],




            [
                'service_id' => 3,
                'name' => 'For initial Review',
                'tts_text' => 'Counter 1 - Incomming / Review Details',
                'step_order' => 1,
                'sla_minutes' => null,
                'is_tts' => 0
            ],
            [
                'service_id' => 3,
                'name' => 'For Final Review',
                'tts_text' => 'Counter 4',
                'step_order' => 2,
                'sla_minutes' => null,
                'is_tts' => 1
            ],
            [
                'service_id' => 3,
                'name' => 'For Approval',
                'tts_text' => 'Counter 7 / Approval',
                'step_order' => 3,
                'sla_minutes' => null,
                'is_tts' => 0
            ],
            [
                'service_id' => 3,
                'name' => 'Released',
                'step_order' => 4,
                'sla_minutes' => null,
                'tts_text' => 'Counter 2 / Released',
                'is_tts' => 1
            ],



            [
                'service_id' => 4,
                'name' => 'For Review',
                'tts_text' => 'Counter 1 - Incomming / Review Details',
                'step_order' => 1,
                'sla_minutes' => null,
                'is_tts' => 0
            ],
            [
                'service_id' => 4,
                'name' => 'For adjustment of OBR',
                'step_order' => 2,
                'sla_minutes' => null,
                'tts_text' => 'Counter 5 or 6 / Issue',
                'is_tts' => 1
            ],
            [
                'service_id' => 4,
                'name' => 'For Approval',
                'step_order' => 3,
                'sla_minutes' => null,
                'tts_text' => 'Counter 7 / Approval',
                'is_tts' => 0
            ],
            [
                'service_id' => 4,
                'name' => 'Released',
                'step_order' => 4,
                'sla_minutes' => null,
                'tts_text' => 'Counter 2 / Released',
                'is_tts' => 1
            ],


            // [
            //     'service_id' => 5,
            //     'name' => 'Receive Request',
            //     'step_order' => 1,
            //     'sla_minutes' => null
            // ],
            // [
            //     'service_id' => 5,
            //     'name' => 'Validate Legal Basis',
            //     'step_order' => 2,
            //     'sla_minutes' => null
            // ],
            // [
            //     'service_id' => 5,
            //     'name' => 'Analyze Impact on Programs',
            //     'step_order' => 3,
            //     'sla_minutes' => null
            // ],
            // [
            //     'service_id' => 5,
            //     'name' => 'Prepare Realignment Document',
            //     'step_order' => 4,
            //     'sla_minutes' => null
            // ],
            // [
            //     'service_id' => 5,
            //     'name' => 'Review by Budget Officer',
            //     'step_order' => 5,
            //     'sla_minutes' => null
            // ],
            // [
            //     'service_id' => 5,
            //     'name' => 'Approval',
            //     'step_order' => 6,
            //     'sla_minutes' => null
            // ],
            // [
            //     'service_id' => 5,
            //     'name' => 'Endorse to Sanggunian / Accounting',
            //     'step_order' => 7,
            //     'sla_minutes' => null
            // ],



            // [
            //     'service_id' => 6,
            //     'name' => 'Receive Request',
            //     'step_order' => 1,
            //     'sla_minutes' => null
            // ],
            // [
            //     'service_id' => 6,
            //     'name' => 'Validate Justification and Urgency',
            //     'step_order' => 2,
            //     'sla_minutes' => null
            // ],
            // [
            //     'service_id' => 6,
            //     'name' => 'Check Available Funds',
            //     'step_order' => 3,
            //     'sla_minutes' => null
            // ],
            // [
            //     'service_id' => 6,
            //     'name' => 'Prepare Budget Action',
            //     'step_order' => 4,
            //     'sla_minutes' => null
            // ],
            // [
            //     'service_id' => 6,
            //     'name' => 'Review by Budget Officer',
            //     'step_order' => 5,
            //     'sla_minutes' => null
            // ],
            // [
            //     'service_id' => 6,
            //     'name' => 'Approval',
            //     'step_order' => 6,
            //     'sla_minutes' => null
            // ],
            // [
            //     'service_id' => 6,
            //     'name' => 'Release / Endorse',
            //     'step_order' => 7,
            //     'sla_minutes' => null
            // ],


        ];

        \App\Models\ServiceStep::insertOrIgnore($data);
    }
}
