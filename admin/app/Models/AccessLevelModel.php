<?php

namespace App\Models;

use CodeIgniter\Model;

class AccessLevelModel extends Model
{
    protected $table = 'access_levels';
    protected $primaryKey = 'access_level_id';
    protected $allowedFields = ['description'];
}
