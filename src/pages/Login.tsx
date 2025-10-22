import React, { useState } from "react";
import { Form, Input, Button, Typography, message, Spin } from "antd";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const { Title } = Typography;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [redirectLoading, setRedirectLoading] = useState(false); // loader after login
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      login(values.email, values.password);
      messageApi.open({
        type: "success",
        content: "Login successful!",
      });
      // Show loader before redirect
      setRedirectLoading(true);
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error: any) {
      messageApi.open({
        type: "error",
        content: error.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  if (redirectLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f0f2f5",
        }}
      >
        <Spin size="large" tip="Loading Dashboard..." />
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      <div className="auth-container">
        <div className="auth-card">
          <Title level={2} className="auth-title">
            Login
          </Title>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Invalid email" },
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter password" }]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Login
              </Button>
            </Form.Item>

            <div className="auth-footer">
              Don't have an account? <a href="/signup">Sign Up</a>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
