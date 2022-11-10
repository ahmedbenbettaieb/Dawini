import axios from "axios";
import React, { useEffect } from "react";

import { Navigate, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getUserData, setUser } from "../redux/userSlice";

export function ProtectedRoute(props: { children: any }) {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}
