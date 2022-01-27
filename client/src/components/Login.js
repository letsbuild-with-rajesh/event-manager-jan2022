import { requestToServer } from '../utils/utils';
import '../css/login.css';

const Login = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();
    let { email, password } = (e.target.elements);
    let loginData = {
      email: email.value,
      password: password.value,
    }
    if (!loginData.email || !loginData.password) {
      alert("Please provide valid credentials!");
      return;
    }

    requestToServer("/auth/login", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    }, false).then(data=> {
      if (data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.role);
        window.location.reload(true);
      } else {
        alert('Invalid Credentials!')
        localStorage.clear();
      }
    });
  }
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={submitHandler}>
        <h2>Login</h2>
        <div className="login-inputs inputs-global-style">
          <label>Email address</label>
          <input type="email" name="email"/>
        </div>
        <div className="login-inputs inputs-global-style">
          <label>Password</label>
          <input type="password" name="password"/>
        </div>
        <div className="btn-wrapper">
          <button className="btn" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
