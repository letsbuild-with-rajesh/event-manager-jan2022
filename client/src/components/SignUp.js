import { useNavigate } from 'react-router-dom';
import { requestToServer } from '../utils/utils';
import '../css/signup.css';

const SignUp = () => {
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    let { name, email, password, role } = (e.target.elements);
    let signUpData = {
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value === "yes" ? "admin" : "user"
    }
    if (!signUpData.name || !signUpData.email || !signUpData.password) {
      alert("Please provide all the details!");
      return;
    }

    requestToServer("/auth/signup", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signUpData)
    }, false).then(data=> {
      if (data) {
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    });
  }

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={submitHandler}>
        <h2>Sign Up</h2>
        <div className="signup-inputs">
          <label>Name</label>
          <input type="text" name="name"/>
        </div>
        <div className="signup-inputs">
          <label>Email address</label>
          <input type="email" name="email"/>
        </div>
        <div className="signup-inputs">
          <label>Password</label>
          <input type="password" name="password" />
        </div>
        <div className="signup-inputs">
          <label>Do you require admin access? (Please note that access is subject to approval)</label>
          <select defaultValue="no" name="role">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="btn-wrapper">
          <button className="btn" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
