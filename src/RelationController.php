<?php

namespace JDH\Backbone;

use App\Http\Controllers\Controller;
use JDH\Backbone\Models\Relation;
use Illuminate\Http\Request;

use Illuminate\Support\Str;
use App\Models\Model;

class RelationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $entry = Relation::where('local_table', $request->local_table)
            ->where('foreign_table', $request->foreign_table)
            ->where('relation_type', $request->relation_type)
            ->first();

        if (!$entry) {
            // Entry does not exist, create a new one
            $newEntry = new Relation();
            $newEntry->local_table = $request->local_table;
            $newEntry->foreign_table = $request->foreign_table;
            $newEntry->relation_type = $request->relation_type;
            // Set other attributes as needed


            $localCapital = Str::studly($request->local_table);
            $localSingular = substr($localCapital, 0, -1);
            $localFilePath = app_path("Models/$localSingular.php");

            $foreignCapital = Str::studly($request->foreign_table);
            $foreignSingular = substr($foreignCapital, 0, -1);
            $foreignFilePath = app_path("Models/$foreignSingular.php");
            $relationInputText = '';

            switch ($request->relation_type) {
                case 'mtm':
                    $relationInputText = "public function " . $request->foreign_table . "()\n{\nreturn \$this->hasMany($foreignSingular::class);\n}\n";
                    break;

                case 'otm':
                    $relationInputText = "public function " . $request->foreign_table . "()\n{\nreturn \$this->hasMany($foreignSingular::class);\n}\n";
                    break;

                case 'oto':
                    $relationInputText = "public function " . $request->foreign_table . "()\n{\nreturn \$this->hasOne($foreignSingular::class);\n}\n";
                    break;

                case 'bt':
                    $relationInputText = "public function " . strtolower($foreignSingular) . "()\n{\nreturn \$this->belongsTo($foreignSingular::class);\n}\n";
                    break;

                default:
                    // Handle invalid relation type
                    return response()->json(['message' => 'Invalid relation type'], 400);
            }

            if (!file_exists($localFilePath)) {
                // Create the model content
                $modelContent = "<?php\n\nnamespace App\Models;\n\nuse Illuminate\Database\Eloquent\Factories\HasFactory;\nuse Illuminate\Database\Eloquent\Model;\n\nclass $localSingular extends Model\n{\n$relationInputText\n}";
                file_put_contents($localFilePath, $modelContent);
            } else {
                // Read the existing model file content into a variable
                $existingModelContent = file_get_contents($localFilePath);

                // Find the position right before the last closing curly brace '}'
                $insertPosition = strrpos($existingModelContent, '}');

                if ($insertPosition !== false) {
                    // Insert the new relation method before the last closing curly brace
                    $modifiedModelContent = substr_replace($existingModelContent, "$relationInputText\n", $insertPosition, 0);
                    file_put_contents($localFilePath, $modifiedModelContent);
                }
            }

            $newEntry->save(); // Save the new entry before modifying models

            // Return success response
            return response()->json(['message' => 'New entry created']);
        } else {
            // Entry already exists, return a response
            return response()->json(['message' => 'Entry already exists']);
        }
    }

    /**
     * Display the specified resource which in the case is the actual table.
     */
    public function show(string $tableName)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        return response()->json(['message' => 'Success!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        return response()->json(['message' => 'Success!']);
    }
}
