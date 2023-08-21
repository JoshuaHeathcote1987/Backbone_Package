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
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class TablesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Backbone/Index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $columns = $request->except('_token');
        $tableName = array_pop($columns);

        // Create the table using Schema Builder
        Schema::create($tableName, function (Blueprint $table) use ($columns) {
            $table->id(); // Add an auto-incrementing primary key

            foreach ($columns as $column) {
                $columnName = $column['column_name'];
                $columnType = $column['column_type'];
                $table->$columnType($columnName);
            }

            $table->timestamps(); // Add created_at and updated_at columns
        });

        // Generate the migration file
        $migrationFileName = date('Y_m_d_His') . '_create_' . strtolower($tableName) . '.php';
        $migrationPath = database_path('migrations/' . $migrationFileName);

        if (!file_exists($migrationPath)) {
            // Generate the column creation part using a loop
            $columnsContent = '';
            foreach ($columns as $column) {
                $columnName = $column['column_name'];
                $columnType = $column['column_type'];
                $columnsContent .= "            \$table->$columnType('$columnName');\n";
            }

            // Complete migration content parts
            $migrationContentFirst = "<?php\n" .
                "\n" .
                "use Illuminate\Database\Migrations\Migration;\n" .
                "use Illuminate\Database\Schema\Blueprint;\n" .
                "use Illuminate\Support\Facades\Schema;\n" .
                "\n" .
                "return new class extends Migration\n" .
                "{\n" .
                "    /**\n" .
                "     * Run the migrations.\n" .
                "     */\n" .
                "    public function up(): void\n" .
                "    {\n" .
                "        Schema::create('$tableName', function (Blueprint \$table) {\n" .
                "$columnsContent" .
                "        });\n" .
                "    }\n";

            $migrationContentSecond = 
                "\n" .
                "    /**\n" .
                "     * Reverse the migrations.\n" .
                "     */\n" .
                "    public function down(): void\n" .
                "    {\n" .
                "        Schema::dropIfExists('$tableName');\n" .
                "    }\n" .
                "};";

            // Combine the two parts of migration content
            $migrationContent = $migrationContentFirst . $migrationContentSecond;

            file_put_contents($migrationPath, $migrationContent);
        } else {
        }

        return response()->json(['message' => 'Table created successfully!']);
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
    public function destroy($tableName)
    {
        Schema::dropIfExists($tableName);
        return response()->json(['message' => 'Success!']);
    }
}
