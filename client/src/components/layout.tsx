import { Badge, Avatar } from "antd";
import React, { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import "../layout.css";
import { useAppSelector } from "../redux/store";

export interface LayoutProps {
  children: React.ReactNode;
}
export function Layout(props: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  var unseenNotificationslength = 0;
  if (user) {
    unseenNotificationslength = user.unseenNotifications.length;
  }
  var id="";
  var isDoctor=false;
  if(user){
    id=user.id;
    isDoctor=user.isDoctor;
  }
  const [collapsed, setCollapsed] = useState(false);

  const userMenu = [
    {
      id: "1",
      name: "Home",
      path: "/",
      icon: "ri-home-smile-fill",
    },
    {
      id: "2",
      name: "Appointments",
      path: "/appointments",
      icon: "ri-task-line",
    },
    {
      id: "3",
      name: "Apply",
      path: "/apply-doctor",
      icon: "ri-file-text-fill",
    },
    {
      id: "4",
      name: "Profile",
      path: "/profile",
      icon: "ri-user-heart-line",
    },
  ];
  const adminMenu = [
    {
      id: "1",
      name: "Home",
      path: "/",
      icon: "ri-home-smile-fill",
    },
    {
      id: "2",
      name: "Users",
      path: "/admin/users",
      icon: "ri-user-line",
    },

    {
      id: "3",
      name: "Doctors",
      path: "/admin/doctors",
      icon: "ri-user-star-line",
    },
    {
      id: "4",
      name: "Profile",
      path: "/profile",
      icon: "ri-user-heart-line",
    },
  ];
    const DoctorMenu = [
      {
        id: "1",
        name: "Home",
        path: "/",
        icon: "ri-home-smile-fill",
      },
      {
        id: "2",
        name: "Appointments",
        path: "/appointments",
        icon: "ri-task-line",
      },
      
      {
        id: "3",
        name: "Profile",
        path: `/doctor/profile/${id}`,
        icon: "ri-user-heart-line",
      },
    ];




  
  const menuToBeRendered = user && user.isAdmin ? adminMenu :isDoctor?DoctorMenu : userMenu;

  if (user === null) return <p>loading...</p>;
  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">MD</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  key={menu.id}
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className="d-flex menu-item"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <i className="ri-logout-circle-line"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
            ;
          </div>
        </div>

        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-line header-action-icons "
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-circle-line   header-action-icons"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            <div
              className="d-flex align-items-center px-4"
              //onClick={() => navigate("notifications")}
            >
              <Badge count={unseenNotificationslength}>
                <i
                  className="ri-notification-3-fill header-action-icons px-2"
                  onClick={() => navigate("notifications")}
                ></i>
              </Badge>
              <Link className="anchor" to="/profile">
                {user ? user.name : null}
              </Link>
            </div>
          </div>
          <div className="body">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
