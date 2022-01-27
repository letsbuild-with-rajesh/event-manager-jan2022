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
        <div>Click on the events hyperlink on the header to view events!</div>
      </div>
    </div>
  );
}

export default User;
