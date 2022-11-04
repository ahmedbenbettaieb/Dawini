import React, { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import '../layout.css';


export interface LayoutProps {
  children: React.ReactNode;
}
export function Layout(props:LayoutProps) {
  const location=useLocation();
  const[collapsed,setCollapsed]=useState(false)

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
    {
      id: "5",
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-circle-r-line",
    },
  ];


  const menuToBeRendered=userMenu;

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar" >
          <div className="sidebar-header">
            <h1>MD</h1>
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
          </div>
          <div className="body">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
