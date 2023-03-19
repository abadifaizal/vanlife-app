import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function AuthRequired() {
  const isLoggedIn = localStorage.getItem('loggedin');
  // Save location of next url
  const location = useLocation();

  return <Outlet/>
}