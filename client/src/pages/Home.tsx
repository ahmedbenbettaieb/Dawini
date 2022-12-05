import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "../components/layout";
import { useAppDispatch } from "../redux/store";
import { getUserData } from "../redux/userSlice";
import { Col, Row } from "antd";
import { Doctor } from "../components/Doctor";
import { hideLoading, showLoading } from "../redux/alertSlice";

export function Home() {
  const dispatch = useAppDispatch();

  // React.useEffect(() => {
  //   dispatch(getUserData());
  // }, [dispatch]);
  const [doctors, setDoctors] = useState([]);

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "api/users/get-all-approved-doctors",

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading())
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout>
      <Row gutter={20}>
        {doctors.map((doctors) => (
          <Col span={8} xs={24} sm={24} lg={8}>
            <Doctor doctor={doctors} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
}
