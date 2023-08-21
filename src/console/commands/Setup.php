<?php

namespace JDH\Backbone\Console\Commands;

use Illuminate\Filesystem\Filesystem;
use Illuminate\Console\Command;

class Setup extends Command
{
    protected $signature = 'set:up';

    protected $description = 'Copies the InertiaJS pages into a location that it can be read and displayed correctly.';

    protected $filesystem;

    public function __construct(Filesystem $filesystem)
    {
        parent::__construct();
        $this->filesystem = $filesystem;
    }

    public function handle()
    {
        $this->updateComposerJson();
        $this->updateAutoloadPsr4();
        $this->addProviderToConfig();
        $this->updateTailwindConfig();
        $this->createSoftLink();
    }
    

    public function updateTailwindConfig()
    {
        $tailwindConfigPath = './tailwind.config.js';

        // Check if the tailwind.config.js file exists
        if (file_exists($tailwindConfigPath)) {
            // Read the contents of the tailwind.config.js file
            $tailwindConfigContents = file_get_contents($tailwindConfigPath);

            // Define the additional entry to add to the content array
            $additionalContentEntry = "'node_modules/preline/dist/*.js',";

            // Find the position where we want to insert the entry in the content array
            $insertPosition = strpos($tailwindConfigContents, "'./resources/js/**/*.jsx',") + strlen("'./resources/js/**/*.jsx',");

            // Insert the entry into the content array at the specified position
            $updatedTailwindConfigContents = substr_replace($tailwindConfigContents, $additionalContentEntry, $insertPosition, 0);

            // Define the new plugin to include
            $newPlugin = "require('preline/plugin'),";

            // Find the position where we want to insert the plugin
            $insertPosition = strpos($updatedTailwindConfigContents, "plugins: [forms,") + strlen("plugins: [forms,");

            // Insert the plugin at the specified position
            $updatedTailwindConfigContents = substr_replace($updatedTailwindConfigContents, $newPlugin, $insertPosition, 0);

            // Write the updated content back to the tailwind.config.js file
            file_put_contents($tailwindConfigPath, $updatedTailwindConfigContents);

            $this->info('tailwind.config.js updated successfully.');
        } else {
            $this->error('tailwind.config.js file not found.');
        }
    }



    public function addProviderToConfig()
    {
        $configPath = './config/app.php';

        // Check if the config/app.php file exists
        if (file_exists($configPath)) {
            // Read the contents of the config/app.php file
            $configContents = file_get_contents($configPath);

            // Define the provider to add
            $providerToAdd = "JDH\Backbone\BackboneServiceProvider::class,";

            // Find the position where we want to insert the provider
            $insertPosition = strpos($configContents, "'providers' => [") + 18; // Add 18 to get to the opening bracket.

            // Insert the provider into the content at the specified position
            $updatedConfigContents = substr_replace($configContents, $providerToAdd, $insertPosition, 0);

            // Write the updated content back to the config/app.php file
            file_put_contents($configPath, $updatedConfigContents);

            $this->info('Provider added to config/app.php successfully.');
        } else {
            $this->error('config/app.php file not found.');
        }
    }


    public function updateAutoloadPsr4()
    {
        $composerPath = './composer.json';

        // Check if the composer.json file exists
        if (file_exists($composerPath)) {
            // Read the contents of the composer.json file
            $composerContents = file_get_contents($composerPath);

            // Decode the JSON data into an associative array
            $composerData = json_decode($composerContents, true);

            // Check if the "autoload" key exists in the JSON data
            if (isset($composerData['autoload']) && isset($composerData['autoload']['psr-4'])) {
                // Add or update the "JDH\\Backbone\\" namespace in the "psr-4" section
                $composerData['autoload']['psr-4']['JDH\\Backbone\\'] = 'vendor/jdh/backbone/src/';

                // Encode the updated data back to JSON
                $updatedComposerContents = json_encode($composerData, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

                // Write the updated content back to the composer.json file
                file_put_contents($composerPath, $updatedComposerContents);

                $this->info('composer.json autoload updated successfully.');
            } else {
                $this->error('The "autoload" or "psr-4" key does not exist in composer.json.');
            }
        } else {
            $this->error('composer.json file not found.');
        }
    }


    public function updateComposerJson()
    {
        $composerPath = './composer.json';

        // Check if the composer.json file exists
        if (file_exists($composerPath)) {
            // Read the contents of the composer.json file
            $composerContents = file_get_contents($composerPath);

            // Decode the JSON data into an associative array
            $composerData = json_decode($composerContents, true);

            // Check if the "require" key exists in the JSON data
            if (isset($composerData['require'])) {
                // Add or update the "jdh/backbone" dependency in the "require" section
                $composerData['require']['jdh/backbone'] = 'dev-main';

                // Encode the updated data back to JSON
                $updatedComposerContents = json_encode($composerData, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

                // Write the updated content back to the composer.json file
                file_put_contents($composerPath, $updatedComposerContents);

                $this->info('composer.json updated successfully.');
            } else {
                $this->error('The "require" key does not exist in composer.json.');
            }
        } else {
            $this->error('composer.json file not found.');
        }
    }

    private function createSoftLink()
    {
        $sourcePath = './vendor/jdh/backbone/src/resources/js/Pages/Backbone';
        $destinationPath = './resources/js/Pages/Backbone';
        try {
            $this->filesystem->link($sourcePath, $destinationPath);
            $this->info('Soft link created successfully!');
        } catch (\Exception $e) {
            $this->error('Failed to create the soft link: ' . $e->getMessage());
        }
    }
}
