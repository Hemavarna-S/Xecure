import React, { useState } from "react";
import { Input, Button, DatePicker, Form, Typography, Alert, Card } from "antd";
import { commonPasswords } from "../data/commonPasswords";
import "./xentinel.css";

const { Title, Text } = Typography;

const PasswordChecker = () => {
  const [result, setResult] = useState(null);

  const checkPassword = (values) => {
    const fullName = values.fullName.toLowerCase();
    const username = values.username.toLowerCase();
    const dob = values.dob.format("YYYY-MM-DD");
    const password = values.password.toLowerCase();

    const isCommon = commonPasswords.includes(password);

    const personalInfo = [
      fullName,
      ...fullName.split(" "),
      username,
      dob,
      ...dob.split("-"),
    ];

    const isRelated = personalInfo.some(
      (info) => info && info.length > 0 && password.includes(info)
    );

    if (isCommon) {
      setResult({
        status: "error",
        message: "⚠️ Extremely weak! Your password exists in the common list.",
      });
    } else if (isRelated) {
      setResult({
        status: "warning",
        message: "⚠️ Weak! Your password is related to personal details.",
      });
    } else {
      setResult({
        status: "success",
        message: "✔ Strong! Not common and not predictable.",
      });
    }
  };

  return (
    <div className="xentinel-root">
      {/* Futuristic neon animated background */}
      <div className="neon-orbital-bg"></div>

      <Card className="xentinel-card">
        <Title level={2} className="xentinel-title">Xentinel</Title>

        <Text className="xentinel-subtitle">
          Advanced Password Dictionary Checker
        </Text>

        <Form layout="vertical" onFinish={checkPassword}>
          <Form.Item label="Full Name" name="fullName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Username" name="username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Date of Birth" name="dob" rules={[{ required: true }]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="xentinel-btn">
            Check Password
          </Button>
        </Form>

        {result && (
          <Alert
            message={result.message}
            type={result.status}
            showIcon
            style={{ marginTop: "20px" }}
          />
        )}
      </Card>
    </div>
  );
};

export default PasswordChecker;
