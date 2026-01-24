<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;

class AdminServiceController extends Controller
{

    public function index(){

        return Inertia::render('Admin/Service/AdminServiceIndex');
    }


    public function show($id){
        return Service::find($id);
    }


    public function getData(Request $req){
        $sort = explode('.', $req->sort_by);

        $data = Service::where('name', 'like', $req->search . '%')
            ->orderBy($sort[0], $sort[1])
            ->paginate($req->perpage);
        return $data;
    }

    public function store(Request $req){

        $req->validate([
            'name' => ['required', 'unique:services'],
        ]);

        Service::create([
            'name' => ucfirst($req->title),
            'description' => $req->description,
            'active' => $req->active ? 1: 0
        ]);

        return response()->json([
            'status' => 'saved'
        ], 200);
    }



    public function update(Request $req, $id){

        $req->validate([
            'title' => ['required', 'unique:categories,title,' . $id . ',id'],
        ]);

        $data = Category::find($id);
        $data->title = ucfirst($req->title);
        $data->slug = Str::slug($req->title);
        $data->description = $req->description;
        $data->active = $req->active ? 1: 0;
        $data->save();

        return response()->json([
            'status' => 'updated'
        ], 200);
    }

    public function destroy($id){
        $data = Category::destroy($id);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
