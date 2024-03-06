<?php

namespace App\Controllers;

use App\Models\AccessLevelModel;
use App\Models\EmployeeModel;
use CodeIgniter\API\ResponseTrait;

class EmployeeController extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $model = new EmployeeModel();
        $employees = $model->findAll();

        // Load AccessLevelModel
        $accessModel = new AccessLevelModel();

        // Iterate through employees to fetch and attach access level descriptions
        foreach ($employees as &$employee) {
            $accessLevelId = $employee['access_level_id'];
            $accessLevel = $accessModel->find($accessLevelId);
            $employee['access_level_description'] = $accessLevel ? $accessLevel['description'] : 'N/A';
        }

        return $this->respond($employees);
    }

    public function create()
    {
        $model = new EmployeeModel();
        $employee = $this->request->getJSON(true);

        $employee['password'] = password_hash($employee['password'], PASSWORD_DEFAULT);

        if ($model->insert($employee)) {
            return $this->respondCreated(['message' => 'Employee created successfully']);
        } else {
            return $this->failServerError('Failed to create employee');
        }
    }

    public function show($id)
    {
        $model = new EmployeeModel();
        $employee = $model->find($id);

        if (!$employee) {
            return $this->failNotFound('Employee not found');
        }

        $accessModel = new AccessLevelModel();

        // Iterate through employees to fetch and attach access level descriptions

        $accessLevelId = $employee['access_level_id'];
        $accessLevel = $accessModel->find($accessLevelId);
        $employee['access_level_description'] = $accessLevel ? $accessLevel['description'] : 'N/A';

        return $this->respond($employee);
    }

    public function update($id)
    {
        $model = new EmployeeModel();
        $employee = $this->request->getJSON(true);

        $employee['password'] = password_hash($employee['password'], PASSWORD_DEFAULT);

        if ($model->update($id, $employee)) {
            return $this->respond(['message' => 'Employee updated successfully']);
        } else {
            return $this->failServerError('Failed to update employee');
        }
    }

    public function delete($id)
    {
        $model = new EmployeeModel();

        if ($model->delete($id)) {
            return $this->respond(['message' => 'Employee deleted successfully']);
        } else {
            return $this->failServerError('Failed to delete employee');
        }
    }
}
