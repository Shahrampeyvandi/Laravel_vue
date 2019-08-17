<?php

use Illuminate\Http\Request;


Route::middleware('auth:api')->get('/user', function (Request $request) {

    return $request->user();
});
//php artisan make:controller API/UserController --api
Route::apiResources(['user' => 'API\UserController']);
