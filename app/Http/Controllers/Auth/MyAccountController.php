<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Auth;

class MyAccountController extends Controller
{
    public function index(){

        $user = Auth::user();

        if(strtolower($user->role) == 'admin'){
            return Inertia::render('Admin/AdminMyAccount', []);
            
        }

        if(strtolower($user->role) == 'staff'){
            return Inertia::render('Staff/StaffMyAccount', []);
        }
        

    }

    public function update(Request $req){
        $user = Auth::user();

        $req->validate([
            'username' => ['required', 'unique:users,username,' .$user->id .',id'],
            'lname' => ['required', 'max:100', 'string'],
            'fname' => ['required', 'max:100', 'string'],
            'mname' => ['max:100'],
            'sex' => ['required', 'max:20', 'string']
        ]);


        $data = User::find($user->id);
        $data->username = $req->username;
        $data->lname = $req->lname;
        $data->fname = $req->fname;
        $data->mname = $req->mname;
        $data->sex = $req->sex;
        $data->save();

        return response()->json([
            'status' => 'updated'
        ], 200);
    }
}
