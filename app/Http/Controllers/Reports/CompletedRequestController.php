<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class CompletedRequestController extends Controller
{
    
    public function index(){
        return Inertia::render('Reports/CompletedRequest/CompletedRequestIndex');
    }
    

    public function getCompletedRequests(Request $request)
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
