<?php

namespace JDH\Backbone;

use App\Http\Controllers\Controller;
use JDH\Backbone\Models\Settings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SettingsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $parameters = $request->all();
        unset($parameters['checked']);
        $existingEntry = Settings::where($parameters)->first();

        if ($existingEntry) {
            $existingEntry->delete();
            return response()->json(['message' => 'Entry deleted successfully']);
        } else {
            Settings::create($parameters);
            return response()->json(['message' => 'Entry created successfully']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($tableName)
    {
        $data = Settings::where('user_id', Auth::id())
            ->where('table_name', $tableName)
            ->get();

        return $data;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Settings $settings)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Settings $settings)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Settings $settings)
    {
        //
    }
}
