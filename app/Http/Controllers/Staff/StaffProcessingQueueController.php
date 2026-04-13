<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StaffProcessingQueueController extends Controller
{
    public function index(){
        return Inertia::render('Staff/MyQueue/ProcessingQueue/ProcessingQueueIndex');
    }



}
