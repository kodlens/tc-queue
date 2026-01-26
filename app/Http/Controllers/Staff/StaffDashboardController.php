<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Queue;
class StaffDashboardController extends Controller
{
    //
    public function index(){
        return Inertia::render('Staff/Dashboard/StaffDashboardIndex');
    }

    public function stats()
    {
        $stats = Queue::select('status')
            ->selectRaw('COUNT(*) as count')
            ->groupBy('status')
            ->get()
            ->keyBy('status');

        return response()->json([
            'waiting' => $stats['waiting']->count ?? 0,
            'processing' => $stats['processing']->count ?? 0,
            'completed' => $stats['completed']->count ?? 0,
        ]);
    }

}
