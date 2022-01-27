import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthHOC = (Component, options = { authRequired: true, authAsAdmin: true} ) => {
  const WrapperComponent = () => {
    let { authRequired, authAsAdmin } = options
    const { loggedIn, isAdmin } = useSelector(state => state.auth);
    let alerted = false;

    if (authRequired && !loggedIn) {
      alert('This page requires you to logged in!')
      return <Navigate to="/" />
    } else if (authRequired && authAsAdmin && !isAdmin) {
      alert('This page requires admin access!')
      return <Navigate to="/" />
    }
    
    return <Component/>
  }
  return WrapperComponent;
}

export default AuthHOC;