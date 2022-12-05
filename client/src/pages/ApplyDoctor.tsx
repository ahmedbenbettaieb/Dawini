import { Button, Col, Form, Input, InputNumber, Row, TimePicker } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import axios from 'axios'
import moment from 'moment'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DoctorForm } from '../components/DoctorForm'
import { Layout } from '../components/layout'
import { showLoading, hideLoading } from '../redux/alertSlice'
import { useAppSelector } from '../redux/store'




type DoctorProps={
    children:React.ReactNode
}
export function ApplyDoctor(props:DoctorProps) {
  const dispatch=useDispatch();
  const {user}=useAppSelector(state =>state.user);
  var id="";
  if(user){
     id=user.id

  }
  var applied=false;

  const navigate=useNavigate()
  const onFinish=async(values:any)=>{
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/users/apply-doctor-account",
        {
          ...values,
          userID: id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to login page");
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());

      toast.error("Something went wrong,try again");
    }
  };
  
  return (
    <Layout>
      <h1 className="page-title">Apply Doctor</h1>
      <hr />
       <Form layout="vertical" onFinish={onFinish}>
        <h1 className="card-title mt-3">Personal Information</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <FormItem
              required
              label="First Name"
              name="firstName"
              rules={[{ required: true }]}
            >
              <Input placeholder="First Name" />
            </FormItem>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <FormItem
              required
              label="Last Name"
              name="lastName"
              rules={[{ required: true }]}
            >
              <Input placeholder="Last Name" />
            </FormItem>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <FormItem
              required
              label="Phone Number"
              name="phoneNumber"
              rules={[{ required: true }]}
            >
              <Input placeholder="Phone number" />
            </FormItem>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <FormItem
              required
              label="Website"
              name="website"
              rules={[{ required: true }]}
            >
              <Input placeholder="Website" />
            </FormItem>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <FormItem
              required
              label="Address"
              name="address"
              rules={[{ required: true }]}
            >
              <Input placeholder="Address" />
            </FormItem>
          </Col>
        </Row>
        <hr />
        <h1 className="card-title mt-3">Professional Information</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <FormItem
              required
              label="Specialization"
              name="specialization"
              rules={[{ required: true }]}
            >
              <Input placeholder="Specialization" />
            </FormItem>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <FormItem
              required
              label="Experience"
              name="experience"
              rules={[{ required: true }]}
            >
              <Input placeholder="Experience" type="number" />
            </FormItem>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <FormItem
              required
              label="Fee per Consultation"
              name="feePerConsultation"
              rules={[{ required: true }]}
            >
              <Input placeholder="Fee per Consultation" type="number" />
            </FormItem>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <FormItem
              required
              label="Timings"
              name="timings"
              rules={[{ required: true }]}
            >
              <TimePicker.RangePicker />
            </FormItem>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <Button className="btn btn-secondary btn-lg " htmlType="submit">
            Submit
          </Button>
        </div>
      </Form> 
      
    </Layout>
  );
}

