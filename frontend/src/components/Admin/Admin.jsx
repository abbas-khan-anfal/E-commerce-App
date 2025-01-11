import React, { useContext, useEffect, useState } from 'react';
import Login from './SiteLogin/Login';
import Dashboard from './Dashboard/Dashboard';
import ForgotPassword from './SiteLogin/ForgotPassword';
import CreatePassword from './SiteLogin/CreatePassword';
import { Routes, Route, Navigate } from 'react-router-dom';
import siteContext from '../../context/Site Context/SiteContext';
import LoaderLg from '../Loaders/Loader-lg';

function Admin() {
  const {adminState, adminStateHandler} = useContext(siteContext);
  const [loading, setLoading] = useState(true);

  // use effect
  useEffect(() => {
    adminStateHandler();
    setLoading(false);
  },[adminState]);


  if(loading) return <LoaderLg/>


  return (
    <>
    {
      adminState
      ?
      (
        <Dashboard />
      )
      :
      (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            {/* Redirect to login if the path is just '/admin' */}
            <Route path="*" element={<Navigate to='/admin/login' />} />
        </Routes>
      )
    }
    </>
  )
}

export default Admin;