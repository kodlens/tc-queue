<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StaffClaimedQueueController extends Controller
{
    public function index(){
        return Inertia::render('Staff/MyQueue/ClaimedQueue/StaffClaimedQueueIndex');
    }

    public function getData(Request $req){

        $req->perpage ? $perpage = $req->perpage : $perpage = 5;


        $data = Queue::with([
            'service',
            'currentStep',
            'serviceSteps'
        ])
        ->when($req->status, function($q) use ($req){
            $q->where('status', $req->status);
        })

        ->where('queue_number', 'like', '%' . $req->search . '%')
        ->orderBy('id', 'desc')
        ->paginate($perpage);

        return $data;

    }

}
