import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Navigate, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { setUser } from "../redux/userSlice";

export function ProtectedRoute(props: { children: any }) {
  const {user} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/users/user",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data.name));
      } else {
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());

      navigate("/login");
    }
  };
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}
