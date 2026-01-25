<?php

namespace App\Http\Controllers\Base;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Queue;

class QueueController extends Controller
{

    public function getData(Request $req){
        $data = Queue::with([
            'service',
            'currentStep',
            'serviceSteps'
        ])->where('queue_number', 'like', '%' . $req->search . '%')
        ->paginate(10);

        return $data;
    }



    public function store(){

    }
}
