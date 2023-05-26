<?php

namespace JDH\Backbone;

use App\Http\Controllers\Controller;
use JDH\Backbone\Models\Settings;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;

use Inertia\Inertia;
use Carbon\Carbon;

class TableController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tables = Schema::getAllTables();

        $tableNames = [];

        foreach ($tables as $table) {
            $values = array_values((array) $table);
            $tableNames[] = $values[0];
        }

        return Inertia::render('Backbone/Index', ['tables' => $tableNames]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $table = $request->table;
        $data = $request->all();
        unset($data['table']);
        $rules = [];

        // Here general rules will have to be set as well as a switch statement to make sure that specific rules are set.
        foreach ($data as $key => $value) {
            $rules[$key] = 'required';
        }

        $validator = Validator::make($data, $rules)->passes();

        if (!$validator) {
            return response()->json(['message' => 'Validation failed, please check your input.']);
        }

        // Here the user will have to manually enter any data that will need to add specific values. For this case, 'the created_at' is created empty, so the current date has to be inserted. Another example of this is 'if the create user doesn't allow for selecting admin, then the admin would be entered here.
        foreach ($data as $key => $value) {
            switch ($key) {
                case 'email_verified_at':
                    $data[$key] = Carbon::now();
                    break;
                case 'created_at':
                    $data[$key] = Carbon::now();
                    break;
                case 'updated_at':
                    $data[$key] = Carbon::now();
                    break;
                case 'password':
                    if (!empty($value)) {
                        $data[$key] = bcrypt($value);
                    }
                    break;
                default:
                    // handle default case
                    break;
            }
        }

        DB::table($table)->insert($data);
        return response()->json(['message' => 'Success!']);
    }

    /**
     * Display the specified resource which in the case is the actual table.
     */
    public function show(string $tableName)
    {
        // Todo::  You will have to check for sensitive data and block them from being sent down the pipe, even administration should have access to such sensitive data.

        if(Auth::id()) {
            $excludes = Settings::where('user_id', Auth::id())
                ->where('table_name', $tableName)
                ->get();
        } else {
            $excludes = null;
        }

        $columns = DB::select('SHOW COLUMNS FROM ' . $tableName);
        $headings = array_map(fn ($col) => $col->Field, $columns);
        $data = DB::table($tableName)->get();
        return Inertia::render('Backbone/Table/Index', ['auth' => Auth::user(), 'headings' => $headings, 'data' => $data, 'table' => $tableName, 'excludes' => $excludes]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $table = $request->table;
        $data = $request->all();
        $id = $data['id'];
        unset($data['table'], $data['id']);
        $rules = [];
    
        // Here general rules will have to be set as well as a switch statement to make sure that specific rules are set.
        foreach ($data as $key => $value) {
            $rules[$key] = 'required';
        }
    
        $validator = Validator::make($data, $rules)->passes();
    
        if (!$validator) {
            return response()->json(['message' => 'Validation failed, please check your input.']);
        }
    
        DB::table($table)->where('id', $id)->update($data);
        return response()->json(['message' => 'Success!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $data = json_decode($request->getContent());
        $table = $data[0];
        array_shift($data);
        DB::table($table)->whereIn('id', $data)->delete();
        return response()->json(['message' => 'Success!']);
    }
}
