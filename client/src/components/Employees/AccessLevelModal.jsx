import React from "react";
import { Button, Modal, Form, Input } from "antd";

const AccessLevelModal = ({
  isCreateAccessLevelModalVisible,
  handleModalCancel,
  handleSaveAccessLevel,
}) => {
  return (
    <Modal
      title="Create Access Level"
      visible={isCreateAccessLevelModalVisible}
      onCancel={handleModalCancel}
      footer={false}
    >
      <Form onFinish={handleSaveAccessLevel}>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Description is required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            key="cancel"
            onClick={handleModalCancel}
            style={{ marginRight: "10px" }}
          >
            Cancel
          </Button>
          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AccessLevelModal;
