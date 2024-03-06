import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async ({ username, password }) => {
    const formData = new FormData();
    formData.append("email", username);
    formData.append("password", password);
    try {
      await axios.post(
        "http://localhost/tandoc_jaymart/admin/public/login",
        formData
      );
      navigate("/employees");
    } catch (error) {
      alert(error.response.data.messages.error);
    }
  };

  return (
    <div className="form-wrapper">
      <Form name="basic" onFinish={handleSubmit}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            // loading={loading}
            style={{ marginTop: "20px" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
