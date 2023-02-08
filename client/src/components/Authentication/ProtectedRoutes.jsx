import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';

const ProtectedRoute = () => {
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');

  if (!token) {
    return <Navigate to="/" replace/>
  } 

  return <Outlet />;
};

export default ProtectedRoute;



