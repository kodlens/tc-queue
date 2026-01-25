<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

use App\Http\Controllers\Base\DocumentController;

class StaffDocumentController extends DocumentController
{
    public function index(){
        return Inertia::render('Staff/StaffDocumentIndex');
    }

}
