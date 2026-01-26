<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;


class ServiceController extends Controller
{
    //

    public function getServices(){
        return Service::where('active', 1)->get([
            'id',
            'code',
            'name',
            'slug',
            'description'
        ]);
    }
}
