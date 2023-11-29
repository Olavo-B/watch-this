import React, { Fragment } from "react";
import { Navigate, Route } from "react-router-dom";
import { Outlet } from 'react-router-dom';

import useAuth from "../hooks/UseAuth";


const ProtectedRoute = () => {

const { signed } = useAuth();

  // alert(signed);
  return signed
    ? <Outlet />
    : <Navigate to="/login" replace />;
};
export default ProtectedRoute;