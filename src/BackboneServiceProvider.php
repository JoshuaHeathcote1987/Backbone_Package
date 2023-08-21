<?php

namespace JDH\Backbone;

use Illuminate\Support\ServiceProvider;
use JDH\Backbone\Console\Commands\Setup;

class BackboneServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->loadMigrationsFrom(__DIR__.'/database/migrations');
        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__.'/database/migrations' => database_path('migrations'),
            ], 'backbone');
        }
        $this->app->make('JDH\Backbone\TablesController');
        $this->app->make('JDH\Backbone\TableController');
        $this->app->make('JDH\Backbone\SettingsController');
        $this->app->make('JDH\Backbone\RelationController');
        $this->app->make('JDH\Backbone\DatabaseCreator');
        
        // $this->loadViewsFrom(__DIR__.'/resources/js/Pages', 'backbone');
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        include __DIR__.'/routes.php';

        if ($this->app->runningInConsole()) {
            $this->commands([
                Setup::class,
            ]);
        }
    }
}
