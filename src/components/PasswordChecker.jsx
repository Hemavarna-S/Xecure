import React, { useState } from "react";
import { Input, Button, DatePicker, Form, Typography, Alert, Card } from "antd";
import { commonPasswords } from "../data/commonPasswords";

const { Title, Text } = Typography;

const PasswordChecker = () => {
  const [result, setResult] = useState(null);

  const checkPassword = (values) => {
    const fullName = values.fullName.toLowerCase();
    const username = values.username.toLowerCase();
    const dob = values.dob.format("YYYY-MM-DD");

    const password = values.password.toLowerCase();

    // 1. Check dictionary match
    const isCommon = commonPasswords.includes(password);

    // 2. Check if password relates to personal info
    const personalInfo = [
      fullName,
      ...fullName.split(" "),
      username,
      dob,
      ...dob.split("-"), // year, month, day
    ];

    const isRelated = personalInfo.some((info) => info && info.length > 0 && password.includes(info));

    // Output logic
    if (isCommon) {
      setResult({
        status: "error",
        message: "Your password is found in the common password list. Very Weak!",
      });
    } else if (isRelated) {
      setResult({
        status: "warning",
        message: "Your password is related to your personal details. Weak!",
      });
    } else {
      setResult({
        status: "success",
        message: "Strong! Not in common list and not related to your personal details.",
      });
    }
  };

  return (
    <div style={{ width: "450px", margin: "0 auto", marginTop: "50px" }}>
      <Card style={{ padding: "20px", borderRadius: "10px" }}>
        <Title level={2} style={{ textAlign: "center" }}>
          Xentinel
        </Title>
        <Text strong style={{ display: "block", textAlign: "center", marginBottom: "20px" }}>
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
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", height: "40px", marginTop: "10px" }}
          >
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
