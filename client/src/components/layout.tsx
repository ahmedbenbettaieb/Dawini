import React, { ReactNode } from "react";

import '../layout.css';

export interface LayoutProps {
  children: React.ReactNode;
}
export function Layout(props:LayoutProps) {
  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">sidebar</div>

        <div className="content">
          <div className="header">header</div>
          <div className="body">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
