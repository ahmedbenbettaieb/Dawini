import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Layout } from "../../components/layout";
import { hideLoading, showLoading } from "../../redux/alertSlice";

export function UsersList() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const getUserData = async () => {
    try {
      dispatch(showLoading());

      const response = await axios.get("/api/admin/get-all-users",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading())
      if (response.data.success) {
        console.log(response.data.data);
        setUsers(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading())
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
    Createdat: string;
    actions:[];
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key:'name',
    },
    {
      title: "Email",
      dataIndex: "email",
      key:'email'
    },
    {
      title: "Created At",
      dataIndex: "createdat",
      key:'createdat'
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key:'actions',
      render: (text: any, record: any) => {
        return <div className="d-flex">
          <h1 className="anchor">Block</h1>
        </div>;
      },
    },
  ];
  return (
    <Layout>
      <h1 className="page-header" onClick={getUserData}>Users List</h1>
      <Table  columns={columns} dataSource={users}/>
    </Layout>
  );
}

