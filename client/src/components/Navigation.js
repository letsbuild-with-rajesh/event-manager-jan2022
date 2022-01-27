import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isLoggedin, isAdminUser } from '../utils/utils';

const Navigation = ({element: Element, access, redirect = "/", ...rest}) => {

  const shouldRedirect = (access) => {
    if (access === "admin") {
      return !(isLoggedin() && isAdminUser());
    } else if (access === "user") {
      return !isLoggedin();
    } else {
      return false;
    }
  }

  return (
    <Route {...rest} render={props => (
      shouldRedirect(access) ?
        <Navigate to={redirect} />
      : <Element {...props} />
    )} />
  );
}

export default Navigation;
