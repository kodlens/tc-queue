<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Auth;
use App\Models\Role;
use Illuminate\Support\Str;

class AdminRoleController extends Controller
{
    //
    public function index(){

        return Inertia::render('Admin/Role/AdminRoleIndex');
    }


    public function show($id){
        return Role::find($id);
    }


    public function getData(Request $req){
        //$sort = explode('.', $req->sort_by);

        $data = Role::where('name', 'like', $req->name . '%')
            ->orderBy('id', 'desc')
            ->paginate(10);
        return $data;
    }


    public function store(Request $req){

        $req->validate([
            'name' => ['required', 'unique:roles'],
        ]);

        Role::create([
            'name' => strtoupper($req->name),
            'slug' => Str::slug($req->name),
            'description' => $req->description
        ]);

        return response()->json([
            'status' => 'saved'
        ], 200);
    }


    public function update(Request $req, $id){

        $req->validate([
            'name' => ['required', 'unique:roles,name,' . $id . ',id'],
        ]);

        $data = Role::find($id);
        $data->name = strtoupper($req->name);
        $data->slug = Str::slug($req->name);
        $data->description = $req->description;
        $data->save();

        return response()->json([
            'status' => 'updated'
        ], 200);
    }

    public function destroy($id){
        $data = Role::destroy($id);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
