<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QueueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'queue_number' => 'Q-0001',
                'reference_no' => 'REF-001',
                'client_name' => 'Juan Dela Cruz',
                'requesting_office' => 'Main Office',
                'service_id' => 1,
                'current_step_id' => 1,
                'status' => 'waiting',
                'priority' => 'normal',
            ],
            [
                'queue_number' => 'Q-0002',
                'reference_no' => 'REF-002',
                'client_name' => 'Maria Santos',
                'requesting_office' => 'Branch A',
                'service_id' => 2,
                'current_step_id' => 1,
                'status' => 'waiting',
                'priority' => 'urgent',
            ],
            [
                'queue_number' => 'Q-0003',
                'reference_no' => 'REF-003',
                'client_name' => 'Pedro Garcia',
                'requesting_office' => 'Branch B',
                'service_id' => 2,
                'current_step_id' => 2,
                'status' => 'processing',
                'priority' => 'normal',
            ],
            [
                'queue_number' => 'Q-0004',
                'reference_no' => 'REF-004',
                'client_name' => 'Ana Lopez',
                'requesting_office' => 'Main Office',
                'service_id' => 3,
                'current_step_id' => 1,
                'status' => 'waiting',
                'priority' => 'normal',
            ],
            [
                'queue_number' => 'Q-0005',
                'reference_no' => 'REF-005',
                'client_name' => 'Carlos Reyes',
                'requesting_office' => 'Branch C',
                'service_id' => 1,
                'current_step_id' => 2,
                'status' => 'processing',
                'priority' => 'urgent',
            ],
            [
                'queue_number' => 'Q-0006',
                'reference_no' => 'REF-006',
                'client_name' => 'Luisa Fernandez',
                'requesting_office' => 'Main Office',
                'service_id' => 2,
                'current_step_id' => 3,
                'status' => 'completed',
                'priority' => 'normal',
            ],
            [
                'queue_number' => 'Q-0007',
                'reference_no' => 'REF-007',
                'client_name' => 'Ricardo Tan',
                'requesting_office' => 'Branch B',
                'service_id' => 3,
                'current_step_id' => 2,
                'status' => 'processing',
                'priority' => 'normal',
            ],
            [
                'queue_number' => 'Q-0008',
                'reference_no' => 'REF-008',
                'client_name' => 'Elena Cruz',
                'requesting_office' => 'Branch A',
                'service_id' => 1,
                'current_step_id' => 1,
                'status' => 'waiting',
                'priority' => 'urgent',
            ],
            [
                'queue_number' => 'Q-0009',
                'reference_no' => 'REF-009',
                'client_name' => 'Miguel Ramos',
                'requesting_office' => 'Main Office',
                'service_id' => 2,
                'current_step_id' => 3,
                'status' => 'completed',
                'priority' => 'normal',
            ],
            [
                'queue_number' => 'Q-0010',
                'reference_no' => 'REF-010',
                'client_name' => 'Sofia Mendoza',
                'requesting_office' => 'Branch C',
                'service_id' => 3,
                'current_step_id' => 2,
                'status' => 'processing',
                'priority' => 'urgent',
            ],
        ];


        \App\Models\Queue::insertOrIgnore($data);
    }
}
