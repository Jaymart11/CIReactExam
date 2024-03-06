import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import EmployeesModal from "./EmployeesModal";
import AccessLevelModal from "./AccessLevelModal";
import axios from "axios";
import dayjs from "dayjs";

const Employees = () => {
  const [isCreateUserModalVisible, setIsCreateUserModalVisible] =
    useState(false);
  const [isCreateAccessLevelModalVisible, setIsCreateAccessLevelModalVisible] =
    useState(false);

  const [data, setData] = useState([]);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        "http://localhost/tandoc_jaymart/admin/public/employees"
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const [editData, setEditData] = useState();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEdit = async ({ employee_id }) => {
    try {
      const res = await axios.get(
        `http://localhost/tandoc_jaymart/admin/public/employees/${employee_id}`
      );
      setEditData(res.data);
    } catch (err) {
      console.log(err);
    }
    setIsCreateUserModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost/tandoc_jaymart/admin/public/employees/${id}`
      );
      alert(res.data.message);
    } catch (err) {
      console.log(err);
    }

    fetchEmployees();
  };

  const handleCreateUser = () => {
    setIsCreateUserModalVisible(true);
  };

  const handleCreateAccessLevel = () => {
    setIsCreateAccessLevelModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsCreateUserModalVisible(false);
    setIsCreateAccessLevelModalVisible(false);
  };

  const handleSaveUser = async ({
    accessLevel,
    age,
    birthDate,
    email,
    firstname,
    lastname,
    password,
    job_title,
  }) => {
    try {
      if (editData?.employee_id) {
        const res = await axios.put(
          `http://localhost/tandoc_jaymart/admin/public/employees/${editData?.employee_id}`,
          {
            access_level_id: accessLevel,
            age,
            birth_date: dayjs(birthDate).format("YYYY-MM-DD"),
            email,
            firstname,
            lastname,
            password,
            job_title,
          }
        );

        alert(res.data.message);
      } else {
        const res = await axios.post(
          "http://localhost/tandoc_jaymart/admin/public/employees",
          {
            access_level_id: accessLevel,
            age,
            birth_date: dayjs(birthDate).format("YYYY-MM-DD"),
            email,
            firstname,
            lastname,
            password,
            job_title,
          }
        );
        alert(res.data.message);
      }

      fetchEmployees();
    } catch (err) {
      console.log(err);
    }
    setIsCreateUserModalVisible(false);
  };

  const handleSaveAccessLevel = async ({ description }) => {
    try {
      const res = await axios.post(
        "http://localhost/tandoc_jaymart/admin/public/accesslevel",
        {
          description,
        }
      );

      alert(res.data.message);
    } catch (err) {
      console.log(err);
    }
    setIsCreateAccessLevelModalVisible(false);
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Job Title",
      dataIndex: "job_title",
      key: "job_title",
    },
    {
      title: "Access Level",
      dataIndex: "access_level_description",
      key: "access_level_description",
    },
    {
      title: "Birth Date",
      dataIndex: "birth_date",
      key: "birth_date",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <span>
            <Button type="link" onClick={() => handleEdit(record)}>
              Edit
            </Button>
            <Button
              type="link"
              onClick={() => handleDelete(record.employee_id)}
              disabled={record.access_level_description === "Super User"}
            >
              Delete
            </Button>
          </span>
        );
      },
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: 16, marginRight: 16 }}
        onClick={() => {
          setEditData();
          handleCreateUser();
        }}
      >
        Create User
      </Button>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={handleCreateAccessLevel}
      >
        Create Access Level
      </Button>
      <Table columns={columns} dataSource={data} />
      <EmployeesModal
        isCreateUserModalVisible={isCreateUserModalVisible}
        handleModalCancel={handleModalCancel}
        handleSaveUser={handleSaveUser}
        editData={editData}
      />
      <AccessLevelModal
        isCreateAccessLevelModalVisible={isCreateAccessLevelModalVisible}
        handleModalCancel={handleModalCancel}
        handleSaveAccessLevel={handleSaveAccessLevel}
      />
    </div>
  );
};

export default Employees;
