import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "antd/dist/antd.css";
import { Button } from "antd";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Toaster } from "react-hot-toast";
import { Home } from "./pages/Home";

import { ProtectedRoute } from "./components/protectedRoute";
import { PublicRoute } from "./components/publicRoute";
import { useAppSelector } from "./redux/store";

export function App() {
  const { loading } = useAppSelector((state) => state.alerts);
  return (
    <div>
      <BrowserRouter>
        {loading && (
          <div className="spinner-parent">
            <div className="spinner-border" role="status"></div>
          </div>
        )}

        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
