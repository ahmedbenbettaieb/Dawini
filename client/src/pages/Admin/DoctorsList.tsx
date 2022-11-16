import Table, { ColumnsType } from "antd/lib/table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Layout } from "../../components/layout";
import { hideLoading, showLoading } from "../../redux/alertSlice";

export function DoctorsList(props: { Children: any }) {
  const [doctors, setDoctors] = useState([]);

  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      dispatch(showLoading());

      const response = await axios.get("/api/admin/get-all-doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());

      if (response.data.success) {
        console.log(response.data.data);
        setDoctors(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  interface DataType {
    key: string;
    name: string;
    Email: number;
    phoneNumber: string;
    Createdat: string;
    status: string;
    actions: [];
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: any, record: any) => {
        return (
          <span >
            {record.firstName} {record.lastName}
          </span>
        );
      },
    },

    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text: any, record: any) => {
        return (
          <div className="d-flex">
            {record.status === "pending" && <h1 className="anchor">Approve</h1>}
            {record.status === "approved" && <h1 className="anchor">Block</h1>}
          </div>
        );
      },
    },
  ];
  return (
    <Layout>
      <h1 className="page-header">Doctors List</h1>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
}
