import { Form, Input, Button } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';

export function Login() {
  const onFinish = (values: any) => {
    console.log("Received values of form ", values);
  };
  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Welcome Back ! </h1>
        <Form layout="vertical" onFinish={onFinish}>
         

          <Form.Item label="Email:" name="email">
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item label="Password:" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Button className="primary-button my-2" htmlType="submit">
            LOGIN
          </Button>
          <Link to="/register" className="anchor mt-2">
            CLICK HERE TO Register
          </Link>
        </Form>
      </div>
    </div>
  );
}

