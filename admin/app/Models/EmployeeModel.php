<?php

namespace App\Models;

use CodeIgniter\Model;

class EmployeeModel extends Model
{
    protected $table = 'employees';
    protected $primaryKey = 'employee_id';
    protected $allowedFields = ['firstname', 'lastname', 'age', 'birth_date', 'email', 'password', 'job_title', 'access_level_id'];

    protected $useTimestamps = true;
    protected $createdField = 'date_created';
    protected $updatedField = 'date_modified';
}
