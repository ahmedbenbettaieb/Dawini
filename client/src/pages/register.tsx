import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";

export function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/users/register", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to login page");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());

      toast.error("Something went wrong,try again");
    }
  };
  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Welcome to MyDoctor ! </h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name:"
            name="name"
            rules={[
              {
                required: true,
                message: "Please  enter your name",
              },
              {
                whitespace: true,
                message: "the name can not be empty",
              },
              {
                min: 3,
                message: "the name can not be under 3 characters",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            label="Email:"
            name="email"
            rules={[
              {
                required: true,
                message: "Please  enter your email",
              },
              {
                type: "email",
                message:'Please enter a valid email'
              },
            ]}
            hasFeedback
          >
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
