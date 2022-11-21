import { Form, Row, Col, Input, TimePicker, Button } from "antd";
import FormItem from "antd/es/form/FormItem";
import React from "react";

export function DoctorForm(onFinish: any) {
  return (
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
  );
}
