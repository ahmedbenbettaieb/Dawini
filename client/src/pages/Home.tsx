import React, { useEffect } from "react";
import axios from "axios";
import { Layout } from "../components/layout";

export function Home() {
  const getData = async () => {
    try {
      const response = await axios.post(
        "/api/users/user",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <h1> Homepage </h1>
    </Layout>
  );
}
