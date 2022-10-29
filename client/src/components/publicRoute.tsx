import React from 'react'
import { Navigate } from 'react-router-dom';

export  function PublicRoute(props: { children: any; }) {
   if (localStorage.getItem("token")) {
     return <Navigate to="/" />;
   } else {
     return  props.children;
   }
}
