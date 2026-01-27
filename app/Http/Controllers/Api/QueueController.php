<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Queue;
use App\Models\Service;
use Illuminate\Http\JsonResponse;

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


    public function getPendingStats()
    {
        $data = Queue::whereIn('status', ['waiting', 'processing'])
            ->select('status')
            ->selectRaw('COUNT(*) as total')
            ->groupBy('status')
            ->get()
            ->keyBy('status');

        return response()->json([
            'waiting' => $data['waiting']->total ?? 0,
            'processing' => $data['processing']->total ?? 0,
        ]);
    }


    public function getTransactionByStatus(string $status):JsonResponse{
         if (empty($status)) {
            return response()->json([
                'errors' => [
                    'status' => ['Status is required.']
                ],
                'message' => 'Status is required.'
            ], 422);
        }

        $data = Queue::join('services as b', 'queues.service_id', '=', 'b.id')
            ->join('service_steps as c', 'queues.current_step_id', '=', 'c.id')
            ->where('status', $status)
            ->select('queues.id as queue_id', 'queue_number', 'reference_no',
                'client_name', 'status', 'priority',
                'b.name as service', 'c.name as current_step',
                'requesting_office',
                'queues.completed_at',
                'queues.claimed_at',
                'queues.created_at')
            ->get();

        return response()->json($data);

    }


    public function getTransactionByWaitingProcessing():JsonResponse{

        $data = Queue::join('services as b', 'queues.service_id', '=', 'b.id')
            ->join('service_steps as c', 'queues.current_step_id', '=', 'c.id')
            ->whereIn('status', ['waiting', 'processing'])
            ->select('queues.id as queue_id', 'queue_number', 'reference_no',
                'client_name', 'status', 'priority',
                'b.name as service', 'c.name as current_step',
                'requesting_office',
                'queues.completed_at',
                'queues.claimed_at',
                'queues.created_at')
            ->get();

        return response()->json($data);

    }


}
