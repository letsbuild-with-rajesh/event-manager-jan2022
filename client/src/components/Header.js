import  React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { loggedIn, isAdmin } = useSelector(state => state.auth);

  const signoutHandler = () => {
    localStorage.clear();
    window.location.href = "/";
  }
  return (
    <nav>
      <Link className="logo-link" to="/"><b>Logo</b></Link>
      <div className="menu-options">
        <Link className="" to="/events">Events</Link>
        {loggedIn && isAdmin &&
           (<><Link to="/categories">Categories</Link>
              <Link to="/locations">Locations</Link>
            </>)}
      </div>
      <div className="signin-links">
        {loggedIn ?
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
