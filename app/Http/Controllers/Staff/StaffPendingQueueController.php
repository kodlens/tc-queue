<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StaffPendingQueueController extends Controller
{

    public function index(){
        return Inertia::render('Staff/MyQueue/PendingQueue/PendingQueueIndex');
    }
}
