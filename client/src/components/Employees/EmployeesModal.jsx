import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select, DatePicker } from "antd";
import axios from "axios";
import dayjs from "dayjs";

const { Option } = Select;

function EmployeesModal({
  isCreateUserModalVisible,
  handleModalCancel,
  handleSaveUser,
  editData,
}) {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          "http://localhost/tandoc_jaymart/admin/public/accesslevel"
        );
        setOptions(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <Modal
      title={editData?.employee_id ? "Update Employee" : "Create Employee"}
      visible={isCreateUserModalVisible}
      onCancel={handleModalCancel}
      footer={false}
      //   footer={[
      //     <Button key="cancel" onClick={handleModalCancel}>
      //       Cancel
      //     </Button>,
      //     <Button key="save" type="primary" onClick={handleSaveUser}>
      //       Save
      //     </Button>,
      //   ]}
    >
      <Form
        onFinish={handleSaveUser}
        initialValues={{
          ...editData,
          birthDate: editData?.birth_date ? dayjs(editData?.birth_date) : "",
        }}
      >
        <Form.Item
          label="First Name"
          name="firstname"
          rules={[{ required: true, message: "Please input your First Name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastname"
          rules={[{ required: true, message: "Please input your Last Name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: "Please input your Age!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Job Title"
          name="job_title"
          rules={[{ required: true, message: "Please input your Job Title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Access Level"
          name="accessLevel"
          rules={[
            { required: true, message: "Please input your Access Level!" },
          ]}
        >
          <Select defaultValue={editData?.access_level_id}>
            {options.map(({ access_level_id, description }) => (
              <Option key={access_level_id} value={access_level_id}>
                {description}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item
          label="Birth Date"
          name="birthDate"
          rules={[{ required: true, message: "Please input your Birth Date!" }]}
        >
          <DatePicker />
        </Form.Item>
        <Button
          key="cancel"
          onClick={handleModalCancel}
          style={{ marginRight: "10px" }}
        >
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          {editData?.employee_id ? "Update" : "Save"}
        </Button>
      </Form>
    </Modal>
  );
}

export default EmployeesModal;
