# Backbone

## About

This project was created using Laravel, InertiaJS, ReactJS and was created to save the user time when dealing with table data for that specific website.
The package is a gui for the table in question table within the database and enables you to create, read, update, and delete. 

Once the setup is complete you can open back bone by going to '/backbone/table' with in the url, this will bring up a page displaying all the tables within the db you're currently connecting to. Clicking any of the tables will present the user with the table as well as its data. 

One import thing to mention is that the column headings can be selected for display, but for this to work the user has to be logged in.

In the future and will implement a relational system so that the user can implement relationships through the gui.

## Getting Started

### 1.	Install Laravel, Inertia, and React.

		composer create-project laravel/laravel example-app
		composer require  laravel/breeze  --dev
		php artisan  breeze:install  react

### 2.	Add 'Backbone' to your composer.json file.

		composer.json

		"require": {
        		"php": "^8.1",
        		"guzzlehttp/guzzle": "^7.2",
        		"inertiajs/inertia-laravel": "^0.6.3",
        		"laravel/framework": "^10.10",
        		"laravel/sanctum": "^3.2",
        		"laravel/tinker": "^2.8",
        		"tightenco/ziggy": "^1.0",
        		"jdh/backbone": "dev-main"
    		},

		"autoload": {
        		"psr-4": {
            		"App\\": "app/",
            		"Database\\Factories\\": "database/factories/",
            		"Database\\Seeders\\": "database/seeders/",
            		"JDH\\Backbone\\": "vendor/jdh/backbone/src/"
        		}
    		},

### 3.	Add 'Backbone' to your config app file.

		config\app.php

		'providers' => ServiceProvider::defaultProviders()->merge([
        		/*
         		* Package Service Providers...
         		*/

        		/*
         		* Application Service Providers...
         		*/
        		App\Providers\AppServiceProvider::class,
        		App\Providers\AuthServiceProvider::class,
        		// App\Providers\BroadcastServiceProvider::class,
        		App\Providers\EventServiceProvider::class,
        		App\Providers\RouteServiceProvider::class,
        		JDH\Backbone\BackboneServiceProvider::class,
    		])->toArray(),

### 4.	Run composer update.

		composer update

### 5.	Run npm.

		npm install preline

### 6.	Add content and plugin to your tailwind config file.

		module.exports = {  content: [      'node_modules/preline/dist/*.js',  ],  plugins: [      require('preline/plugin'),  ],}

### 7.	Add import preline to your app.js file.

		import('preline')

### 8.	Run backbone command

		php artisan set:up

### 9.	Run reactjs icon

		npm install react-icons --save

### 10.	Migration
	
		php artisan migrate:fresh

