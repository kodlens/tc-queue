<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class AdminServiceController extends Controller
{

    public function index(){

        return Inertia::render('Admin/Service/AdminServiceIndex');
    }


    public function show($id){
        return Service::find($id);
    }


    public function getData(Request $req){
        //$sort = explode('.', $req->sort_by);

        $data = Service::where('name', 'like', $req->search . '%')
            ->orderBy('id', 'desc')
            ->paginate(10);
        return $data;
    }

    public function store(Request $req){

        $req->validate([
            'name' => ['required', 'unique:services'],
        ]);

        Service::create([
            'name' => ucfirst($req->name),
            'description' => $req->description,
            'active' => $req->active ? 1: 0
        ]);

        return response()->json([
            'status' => 'saved'
        ], 200);
    }



    public function update(Request $req, $id){

        $req->validate([
            'name' => ['required', 'unique:services,name,' . $id . ',id'],
        ]);

        $data = Service::find($id);
        $data->name = ucfirst($req->name);
        $data->description = $req->description;
        $data->active = $req->active ? 1: 0;
        $data->save();

        return response()->json([
            'status' => 'updated'
        ], 200);
    }

    public function destroy($id){
        $data = Service::destroy($id);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
