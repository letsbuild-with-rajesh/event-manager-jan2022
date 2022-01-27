import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthenticatedUser } from '../utils/utils';

const AuthHOC = (Component, options) => {
  const WrapperComponent = () => {
    let { authRequired = true, authAsAdmin = false } = options
    const { loggedIn, isAdmin } = useSelector(state => state.auth);

    if (authRequired && !loggedIn) {
      alert('This page requires you to logged in!')
      return <Navigate to="/" />
    }
    return <Component/>
  }
  return WrapperComponent;
}

export default AuthHOC;