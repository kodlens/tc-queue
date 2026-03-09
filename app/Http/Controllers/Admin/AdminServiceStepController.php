<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\ServiceStep;

use Inertia\Inertia;
use Inertia\Response;

class AdminServiceStepController extends Controller
{
    public function index(){
        return Inertia::render('Admin/ServiceStep/AdminServiceStepIndex');
    }

    public function getData(Request $request){
        $serviceSteps = ServiceStep::with('service')->paginate(10);

        return response()->json($serviceSteps);
    }
}
