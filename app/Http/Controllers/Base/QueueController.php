<?php

namespace App\Http\Controllers\Base;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Queue;

class QueueController extends Controller
{

    public function getData(Request $req){

        $req->perpage ? $perpage = $req->perpage : $perpage = 5;

        $data = Queue::with([
            'service',
            'currentStep',
            'serviceSteps'
        ])->where('queue_number', 'like', '%' . $req->search . '%')
        ->paginate($perpage);

        return $data;
    }



    public function store(){

    }


    public function startProcess($id){
        $queue = Queue::find($id);
        $queue->status = 'processing';
        $queue->save();

        return response()->json([
            'status' => 'process'
        ]);
    }

    public function markCompleted($id){
        $queue = Queue::find($id);
        $queue->status = 'completed';
        $queue->completed_at = now();
        $queue->save();

        return response()->json([
            'status' => 'completed'
        ]);
    }

    public function moveToStep(Request $req, $id){
        $req->validate([
            'current_step_id' => ['required', 'numeric']
        ]);

        $queue = Queue::find($id);
        $queue->current_step_id = $req->current_step_id;
        $queue->save();

        return response()->json([
            'status' => 'moved'
        ]);
    }
}
