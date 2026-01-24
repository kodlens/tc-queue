<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');




Route::post('/queue', [App\Http\Controllers\Api\QueueController::class, 'store']);
Route::get('/queue/{queue_number}', [App\Http\Controllers\Api\QueueController::class, 'show']); //get queue status

