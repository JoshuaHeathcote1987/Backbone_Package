<?php

namespace JDH\Backbone\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Relation extends Model
{
    use HasFactory;

    protected $fillable = ['local_table', 'foreign_table', 'relation_type'];
}
