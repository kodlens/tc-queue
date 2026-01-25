<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Base\QueueController;

use App\Http\Controllers\Base\DocumentController;

class StaffQueueController extends QueueController
{
    public function index(){
        return Inertia::render('Staff/StaffDocumentIndex');
    }

}
