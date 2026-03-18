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
        $serviceSteps = ServiceStep::with('service')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($serviceSteps, 200);
    }


    public function store(Request $req){

        $validatedData = $req->validate([
            'service_id' => ['required'],
            'name' => ['required', 'string', 'max:255'],
        ]);

        $serviceStep = ServiceStep::create([
            'service_id' => $validatedData['service_id'],
            'name' => $validatedData['name'],
            'step_order' => $req->input('step_order'),
            'sla_minutes' => $req->input('sla_minutes'),
        ]);

        return response()->json([
            'status' => 'saved'
        ], 200);
    }

    public function update(Request $req, $id){

        $serviceStep = ServiceStep::findOrFail($id);

        $validatedData = $req->validate([
            'service_id' => ['required'],
            'name' => ['required', 'string', 'max:255'],
        ]);

        $serviceStep->update([
            'service_id' => $validatedData['service_id'],
            'name' => $validatedData['name'],
            'step_order' => $req->input('step_order'),
            'sla_minutes' => $req->input('sla_minutes'),
        ]);

        return response()->json([
            'status' => 'updated'
        ], 200);
    }
    
    public function destroy($id){
        $serviceStep = ServiceStep::findOrFail($id);
        $serviceStep->delete();

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
