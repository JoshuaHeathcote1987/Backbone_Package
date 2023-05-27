# Backbone

## About

This project is a time-saving solution developed using Laravel, InertiaJS, and ReactJS, specifically designed to streamline the management of table data for a particular website. Its primary objective is to enhance user efficiency when working with database tables.

This package serves as a user-friendly graphical interface (GUI) for the targeted table within the database. It facilitates essential CRUD (Create, Read, Update, Delete) operations, empowering users to seamlessly interact with the data.

Upon completing the setup process, users can access the Backbone GUI by navigating to '/backbone/table' within the URL. This action triggers the display of a page showcasing all the tables within the currently connected database. By clicking on any of these tables, users gain access to the respective table's data, presented in an organized format.

Notably, the GUI allows users to selectively choose which column headings they wish to display. However, it is important to highlight that this functionality requires users to be logged in for proper operation and security purposes.

As part of future development, an innovative relational system is planned for implementation. This system will empower users to establish and manage relationships directly through the GUI, further enhancing the efficiency and flexibility of the solution.

Overall, this project leverages the power of Laravel, InertiaJS, and ReactJS to provide an intuitive and efficient means of handling table data within a specified website. It offers an accessible GUI, essential CRUD operations, and promises future advancements through the inclusion of a relational system.

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

