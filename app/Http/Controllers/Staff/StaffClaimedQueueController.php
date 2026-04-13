<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StaffClaimedQueueController extends Controller
{
    public function index(){
        return Inertia::render('Staff/MyQueue/ClaimedQueue/ClaimedQueueIndex');
    }

}
