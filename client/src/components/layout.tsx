import React, { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

import '../layout.css';

export interface LayoutProps {
  children: React.ReactNode;
}
export function Layout(props:LayoutProps) {
  const location=useLocation();

  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-smile-fill",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-task-line",
    },
    {
      name: "Apply",
      path: "/apply-doctor",
      icon: "ri-file-text-fill",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-heart-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-circle-r-line",
    },
  ];


  const menuToBeRendered=userMenu;

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1>MyDoctor</h1>

          </div>
          <div className="menu">
            {menuToBeRendered.map((menu)=>{
              const isActive=location.pathname===menu.path;
                return (<div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                    <i className={menu.icon}></i>
                    <Link to= {menu.path}>{menu.name}</Link>
                  </div>
            )
            })}
          </div>
        </div>

        <div className="content">
          <div className="header">header</div>
          <div className="body">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
