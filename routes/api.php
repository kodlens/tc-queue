<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/queue', [App\Http\Controllers\Api\QueueController::class, 'store']);
Route::get('/queue/{queue_number}', [App\Http\Controllers\Api\QueueController::class, 'show']); //get queue status


Route::get('/get-services', [App\Http\Controllers\Api\ServiceController::class, 'getServices']); //get services
Route::get('/get-pending-stats', [App\Http\Controllers\Api\QueueController::class, 'getPendingStats']);

Route::get('/get-transaction-status/{status}', [App\Http\Controllers\Api\QueueController::class, 'getTransactionByStatus']); //get services
Route::get('/get-transaction-waiting-processing', [App\Http\Controllers\Api\QueueController::class, 'getTransactionByWaitingProcessing']); //get services


Route::get('/get-signatory', [App\Http\Controllers\Api\SignatoryController::class, 'getSignatory']);
