<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ReportController extends Controller
{
    
    // public function getQueueStatusSummary()
    // {
    //     $summary = \DB::table('queues')
    //         ->selectRaw("
    //             COUNT(*) as total,
    //             SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
    //             SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as in_progress,
    //             SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed
    //         ")
    //         ->first();

    //     return response()->json($summary);
    // }

    public function getAverageProcessingTime()
    {
        $data = \DB::table('queues')
            ->whereNotNull('completed_at')
            ->selectRaw("
                AVG(TIMESTAMPDIFF(HOUR, created_at, completed_at)) as avg_hours,
                MIN(TIMESTAMPDIFF(HOUR, created_at, completed_at)) as min_hours,
                MAX(TIMESTAMPDIFF(HOUR, created_at, completed_at)) as max_hours
            ")
            ->first();

        return response()->json($data);
    }


    public function getProcessingTimePerService()
    {
        $data = \DB::table('queues')
            ->join('services', 'queues.service_id', '=', 'services.id')
            ->whereNotNull('queues.completed_at')
            ->select(
                'services.id',
                'services.name'
            )
            ->selectRaw("
                COUNT(*) as total_requests,
                AVG(TIMESTAMPDIFF(HOUR, queues.created_at, queues.completed_at)) as avg_hours,
                MIN(TIMESTAMPDIFF(HOUR, queues.created_at, queues.completed_at)) as min_hours,
                MAX(TIMESTAMPDIFF(HOUR, queues.created_at, queues.completed_at)) as max_hours
            ")
            ->groupBy('services.id', 'services.name')
            ->orderByDesc('avg_hours') // 🔥 slowest first
            ->get();

        return response()->json($data);
    }


    public function getCompletedRequestsReport(Request $request)
    {
        $from = $request->from;
        $to = $request->to;

        $data = DB::table('queues')
            ->join('services', 'queues.service_id', '=', 'services.id')
            ->whereNotNull('queues.completed_at')
            ->whereBetween('queues.completed_at', [$from, $to])
            ->select(
                'queues.queue_number',
                'queues.client_name',
                'services.name as service',
                'queues.requesting_office',
                'queues.reference_no',
                'queues.completed_at',
                'queues.claimed_at'
            )
            ->orderBy('queues.completed_at', 'desc')
            ->get();

        return response()->json($data);
    }




}
