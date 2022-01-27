import { Link } from 'react-router-dom';
import '../css/user.css';

const User = () => {
  let user = {
    name: "Test",
    email: "test@test.com"
  }
  return (
    <div className="user-container">
      <div className="user-details">
        <div>Name : {user.name}</div>
        <div>Email : {user.email}</div>
        <br/>
        <p><Link to="/events">Click here</Link> to view events</p>
      </div>
    </div>
  );
}

export default User;
