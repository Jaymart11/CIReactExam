<?php

namespace App\Controllers;

use App\Models\AccessLevelModel;
use CodeIgniter\API\ResponseTrait;

class AccessLevelController extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $model = new AccessLevelModel();
        $access_level = $model->findAll();

        return $this->respond($access_level);
    }

    public function create()
    {
        $model = new AccessLevelModel();
        $access_level = $this->request->getJSON(true);

        if ($model->insert($access_level)) {
            return $this->respondCreated(['message' => 'Access Level created successfully']);
        } else {
            return $this->failServerError('Failed to create access level');
        }
    }

    public function show($id)
    {
        $model = new AccessLevelModel();
        $access_level = $model->find($id);

        if (!$access_level) {
            return $this->failNotFound('Access Level not found');
        }

        return $this->respond($access_level);
    }

    public function update($id)
    {
        $model = new AccessLevelModel();
        $access_level = $this->request->getJSON(true);

        if ($model->update($id, $access_level)) {
            return $this->respond(['message' => 'Access Level updated successfully']);
        } else {
            return $this->failServerError('Failed to update access level');
        }
    }

    public function delete($id)
    {
        $model = new AccessLevelModel();

        if ($model->delete($id)) {
            return $this->respond(['message' => 'Access Level deleted successfully']);
        } else {
            return $this->failServerError('Failed to delete access level');
        }
    }
}
