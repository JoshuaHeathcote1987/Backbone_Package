<?php

use Illuminate\Support\Facades\Route;

Route::prefix('/backbone')->middleware('web')->group(function () {
    // Table API for all table functionality.
    Route::apiResource('/', JDH\Backbone\TableController::class);
    Route::apiResource('settings', JDH\Backbone\SettingsController::class);
});