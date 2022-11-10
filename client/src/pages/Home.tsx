import React, { useEffect } from "react";
import axios from "axios";
import { Layout } from "../components/layout";
import { useAppDispatch } from "../redux/store";
import { getUserData } from "../redux/userSlice";

export function Home() {
  const dispatch = useAppDispatch();
  
  React.useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  return (
    <Layout>
      <h2> Homepage </h2>
    </Layout>
  );
}
