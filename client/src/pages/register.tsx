import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toast } from "react-hot-toast";
import { Button, Form, Input } from "antd";

export function Register() {
  const onFinish = async (values: any) => {
    try {
      const response = await axios.post("/api/users/register", values);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong,try again");
    }
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
            <Input placeholder="Email" type="email" />
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
