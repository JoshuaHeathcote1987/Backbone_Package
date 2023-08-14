<?php

namespace JDH\Backbone;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

class DatabaseCreator extends Controller
{
    public function createTable(string $tableName, array $columns)
    {
        // Step 1: Create Migration
        $migrationName = 'create_' . $tableName . '_table';
        Artisan::call('make:migration', [
            'name' => $migrationName,
        ]);

        // Step 2: Edit Migration File
        $migrationFileName = $this->getLatestMigrationFileName();
        $this->editMigrationFile($migrationFileName, $tableName, $columns);

        // Step 3: Run Migration
        Artisan::call('migrate');
    }

    private function getLatestMigrationFileName()
    {
        $migrationPath = database_path('migrations');
        $migrationFiles = scandir($migrationPath, SCANDIR_SORT_DESCENDING);
        return $migrationFiles[0];
    }

    private function editMigrationFile($fileName, $tableName, $columns)
    {
        $migrationFilePath = database_path('migrations') . DIRECTORY_SEPARATOR . $fileName;
        $migrationContent = file_get_contents($migrationFilePath);

        $columnDefinitions = collect($columns)->map(function ($column) {
            return "\$table->{$column['type']}('{$column['name']}');";
        })->implode("\n            ");

        $newContent = str_replace(
            '$table->id();',
            "$columnDefinitions\n            \$table->timestamps();",
            $migrationContent
        );

        file_put_contents($migrationFilePath, $newContent);
    }
}