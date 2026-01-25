<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\ReportController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');


/** =======================================
 * CATEGORY PAGES HERE
 * ========================================
 */
Route::get('/km/login', [App\Http\Controllers\WelcomePageController::class, 'index'])->name('welcome');



Route::middleware('auth')->group(function () {


    Route::get('/my-account', [App\Http\Controllers\Auth\MyAccountController::class, 'index']);
    Route::patch('/my-account-update', [App\Http\Controllers\Auth\MyAccountController::class, 'update']);

    Route::get('/change-password', [App\Http\Controllers\Auth\ChangePasswordController::class, 'index']);
    Route::post('/change-password', [App\Http\Controllers\Auth\ChangePasswordController::class, 'changePassword']);

    /** ====================REPORTS======================== */

    Route::get('/reports/articles-by-quarter', [ReportController::class, 'articlesByQuarter']);
    Route::get('/reports/articles-by-status', [ReportController::class, 'articlesByStatus']);
    Route::get('/reports/publication-timeliness', [ReportController::class, 'publicationTimeliness']);

    //global service API
    //Route::get('/remove-file/{filename}', [App\Http\Controllers\FileController::class, 'removeFile']);

});


Route::prefix('admin')->middleware('auth', 'admin')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/dashboard', [App\Http\Controllers\Admin\AdminDashboardController::class, 'index'])->name('admin.dashboard.index');


    Route::resource('/services', App\Http\Controllers\Admin\AdminServiceController::class)->names('admin.services');
    Route::get('/get-services', [App\Http\Controllers\Admin\AdminServiceController::class, 'getData'])->name('admin.services.get-data');


    Route::resource('/roles', App\Http\Controllers\Admin\AdminRoleController::class)->names('admin.roles');
    Route::get('/get-roles', [App\Http\Controllers\Admin\AdminRoleController::class, 'getData'])->name('admin.roles.get-data');


    Route::resource('/users', App\Http\Controllers\Admin\AdminUserController::class);
    Route::get('/get-users', [App\Http\Controllers\Admin\AdminUserController::class, 'getData'])->name('users.getdata');
    Route::post('/users-change-password/{id}', [App\Http\Controllers\Admin\AdminUserController::class, 'changePassword'])->name('users.change-password');
    Route::post('/change-password/{id}', [App\Http\Controllers\Admin\AdminUserController::class, 'changePassword'])->name('users.change-password');
    Route::post('/users-assign-service/{id}', [App\Http\Controllers\Admin\AdminUserController::class, 'assignService'])->name('admin.users.assign-service');
    Route::delete('/users-unassign-service/{userServiceId}', [App\Http\Controllers\Admin\AdminUserController::class, 'unassignService'])->name('admin.users.unassign-service');

    Route::resource('/roles', App\Http\Controllers\Admin\AdminRoleController::class);
    Route::get('/get-roles', [App\Http\Controllers\Admin\AdminRoleController::class, 'getData'])->name('roles.getdata');

    Route::resource('/permissions', App\Http\Controllers\Admin\AdminPermissionController::class);
    Route::get('/get-permissions', [App\Http\Controllers\Admin\AdminPermissionController::class, 'getData'])->name('permissions.getdata');

    Route::resource('/role-has-permissions', App\Http\Controllers\Admin\AdminRoleHasPermissionController::class);
    Route::get('/get-role-has-permissions', [App\Http\Controllers\Admin\AdminRoleHasPermissionController::class, 'getData'])->name('role-has-permissions.getdata');

});

/** THIS ROUTE IS FOR PUBLISHER */
Route::prefix('staff')->middleware('auth', 'staff')->group(function () {

    Route::get('/dashboard', [App\Http\Controllers\Staff\StaffDashboardController::class, 'index'])->name('staff.dashboard.index');

    Route::resource('/documents', App\Http\Controllers\Staff\StaffDocumentController::class);

});

require __DIR__.'/auth.php';



// logout auth (use for debuggin only)
Route::get('/applogout', function(Request $req){

    Auth::guard('web')->logout();
    $req->session()->invalidate();

    $req->session()->regenerateToken();

    return redirect('/');
});

use Illuminate\Support\Facades\Hash;
if(env('APP_DEBUG')){
    // logout auth (use for debuggin only)
    Route::get('/gen/pass/{pass}', function($pass){
        return Hash::make($pass);
    });

}
