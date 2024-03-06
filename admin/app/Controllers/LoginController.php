<?php

namespace App\Controllers;

use App\Models\EmployeeModel;
use CodeIgniter\API\ResponseTrait;

class LoginController extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $email = $this->request->getPost('email');
        $password = $this->request->getPost('password');

        if (empty($email) || empty($password)) {
            return $this->failValidationErrors('Email and password are required.');
        }

        $employeeModel = new EmployeeModel();
        $user = $employeeModel->where('email', $email)->first();

        if (!$user) {
            return $this->failNotFound('User not found.');
        }

        if (!password_verify($password, $user['password'])) {
            return $this->failUnauthorized('Incorrect password.');
        }

        return $this->respond($user);
    }
}
