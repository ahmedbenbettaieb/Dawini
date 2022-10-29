import React from "react";

import { Navigate } from "react-router-dom";

export function ProtectedRoute(props: { children: any }) {
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}
