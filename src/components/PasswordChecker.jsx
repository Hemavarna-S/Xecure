import React, { useState, useEffect, useRef } from "react";
import { Input, Button, DatePicker, Form, Typography, Alert, Card } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { commonPasswords } from "../data/commonPasswords";
import "./xentinel.css";

const { Title, Text } = Typography;

const PasswordChecker = () => {
  const [result, setResult] = useState(null);
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [ghostState, setGhostState] = useState("idle"); 
  const ghostRef = useRef(null);

  // RANDOM FLOATING MOVEMENT
  useEffect(() => {
    const ghost = ghostRef.current;
    if (!ghost) return;

    const moveGhost = () => {
      const x = Math.random() * 60 - 30; 
      const y = Math.random() * 40 - 20;

      ghost.style.transform = `translate(${x}px, ${y}px)`;
    };

    const interval = setInterval(moveGhost, 2000);
    return () => clearInterval(interval);
  }, []);

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

    // GHOST spins & disappears
    setGhostState("exit");
    setTimeout(() => setGhostState("idle"), 1500);
  };

  return (
    <div className="xentinel-root">
      <div className="neon-orbital-bg"></div>

      {/* Floating Ghost */}
      <div
        ref={ghostRef}
        className={`floating-ghost 
          ${isTypingPassword ? "ghost-shy" : ""} 
          ${showPassword ? "ghost-eyes-open" : ""}
          ${ghostState === "exit" ? "ghost-exit" : ""}
        `}
      >
        <div className="ghost-eye eye-left"></div>
        <div className="ghost-eye eye-right"></div>
        <div className="ghost-mouth"></div>
        <div className="ghost-sheet"></div>
      </div>

      <Card className="xentinel-card">
        <Title level={2} className="xentinel-title">
          Xentinel
        </Title>

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

          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password
              onChange={() => setIsTypingPassword(true)}
              onBlur={() => setIsTypingPassword(false)}
              iconRender={(visible) => {
                setShowPassword(visible);
                return visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />;
              }}
            />
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
