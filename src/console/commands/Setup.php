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
