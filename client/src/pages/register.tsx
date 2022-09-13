import { Button, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export function Register() {
  const onFinish = (values: any) => {
    console.log("Received values of form ", values);
  };
  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Welcome to your site ! </h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name:" name="name">
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item label="Email:" name="email">
            <Input placeholder="Email"  type="email"/>
          </Form.Item>

          <Form.Item label="Password:" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Button className="primary-button my-2" htmlType="submit">
            Register
          </Button>
          <Link to="/login" className="anchor mt-2">
            CLICK HERE TO LOGIN
          </Link>
        </Form>
      </div>
    </div>
  );
}
