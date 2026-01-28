<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;


class SignatoryController extends Controller
{
    //

    public function getSignatory():JsonResponse {

        $signatory = DB::table('signatories')
            ->where('active', 1)
            ->get();

        return response()->json($signatory);
    }
}
