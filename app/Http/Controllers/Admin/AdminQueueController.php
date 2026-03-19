<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Queue;


class AdminQueueController extends Controller
{
    public function index(){
        return Inertia::render('Admin/Queues/AdminQueueIndex', [
            'queues' => []
        ]);
    }

    public function getData(Request $req){

        $search = $req->input('search');
        $client = $req->input('client');

        $queues = Queue::with('service', 'currentStep')
            ->where('queue_number', 'like', "%{$search}%")
            ->where('client_name', 'like', "%{$client}%")
            ->paginate();

        return response()->json($queues, 200);
    }


    public function destroy($id){
        // delete queue
        Queue::destroy($id);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
