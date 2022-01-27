import  React from "react";
import { Link } from "react-router-dom";
import { isLoggedin, isAdminUser } from '../utils/utils';

const Header = () => {
  const isLoggedIn = isLoggedin();
  const isAdmin = isAdminUser();

  const signoutHandler = () => {
    localStorage.clear();
    window.location.href = "/";
  }
  return (
    <nav>
      <Link className="logo-link" to="/"><b>Logo</b></Link>
      <div className="menu-options">
        <Link className="" to="/events">Events</Link>
        {isLoggedIn && isAdmin &&
           (<><Link to="/categories">Categories</Link>
              <Link to="/locations">Locations</Link>
            </>)}
      </div>
      <div className="signin-links">
        {isLoggedIn ?
          <Link to="/" onClick={signoutHandler}>Sign Out</Link>
          :
          <>
            <Link to="/">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>}
      </div>
    </nav>
  );
}

export default Header;
