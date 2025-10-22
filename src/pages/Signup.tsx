import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { signUp } from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const { Title } = Typography;

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      signUp({
        username: values.username,
        email: values.email,
        password: values.password,
      });
      messageApi.open({
        type: "success",
        content: "User registered successfully!",
      });
      navigate("/login");
    } catch (error: any) {
      // Show alert if email already exists
      messageApi.open({
        type: "error",
        content: error.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="auth-container">
        <div className="auth-card">
          <Title level={2} className="auth-title">
            Sign Up
          </Title>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Enter username" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Enter email" },
                { type: "email", message: "Invalid email" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Enter password" },
                { min: 6, message: "Min 6 characters" },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Confirm password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Passwords do not match");
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Sign Up
              </Button>
            </Form.Item>

            <div className="auth-footer">
              Already have an account? <a href="/login">Login</a>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
