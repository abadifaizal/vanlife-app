import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthRequired() {
  const auth = { token: null};
  if(!auth.token) {
    return <Navigate to="login"/>
  }
  return <Outlet/>
}