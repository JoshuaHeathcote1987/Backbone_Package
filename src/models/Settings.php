<?php

namespace JDH\Backbone\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Settings extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'table_name', 'crud_title', 'column_title'];
}
