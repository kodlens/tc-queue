<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Queue;
use App\Models\Service;


class QueueController extends Controller
{
    public function store(Request $request)
    {

        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'requesting_office' => 'required|string|max:255',
            'service_id' => 'required|exists:services,id',
        ]);

        return DB::transaction(function () use ($validated) {
            $serviceId = $validated['service_id'];

            // Lock to prevent duplicate queue numbers
            $lastQueue = Queue::where('service_id', $serviceId)
                ->lockForUpdate()
                ->latest()
                ->first();

            $nextNumber = $lastQueue
                ? intval(preg_replace('/\D/', '', $lastQueue->queue_number)) + 1
                : 1;

            $service = Service::find($serviceId);

            $queueNumber = strtoupper(substr($service->name, 0, 3)) . '-' . str_pad($nextNumber, 3, '0', STR_PAD_LEFT);

            $queue = Queue::create([
                'queue_number' => $queueNumber,
                'client_name' => $validated['client_name'],
                'requesting_office' => $validated['requesting_office'],
                'service_id' => $serviceId,
                'status' => 'waiting',
            ]);

            $service = Service::find($serviceId);

            return response()->json([
                'message' => 'Queue created successfully',
                'data' => $queue,
                'service' => $service->name
            ], 201);
        });
    }



    public function show(string $queue_number)
    {
        $queue = Queue::with([
                'service:id,name',
                'currentStep:id,name,step_order',
                'logs.step:id,name,step_order',
                'logs.updatedBy:id,name'
            ])
            ->where('queue_number', $queue_number)
            ->first();

        if (! $queue) {
            return response()->json([
                'message' => 'Queue not found'
            ], 404);
        }

        return response()->json([
            'queue_number' => $queue->queue_number,
            'client_name' => $queue->client_name,
            'requesting_office' => $queue->requesting_office,
            'service' => $queue->service->name,
            'status' => $queue->status,
            'current_step' => optional($queue->currentStep)->name,
            'history' => $queue->logs->map(function ($log) {
                return [
                    'step' => optional($log->step)->name,
                    'action' => $log->action,
                    'remarks' => $log->remarks,
                    'updated_by' => optional($log->updatedBy)->name,
                    'time' => $log->created_at->toDateTimeString(),
                ];
            }),
        ]);
    }
}
