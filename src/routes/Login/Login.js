import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const options = {
      url: "rest/usermanagement/auth/login",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        username: username,
        password: password,
      },
    };

    axios(options)
      .then((response) => {
        if (response.data.success.token != null) {
          localStorage.setItem("token", response.data.success.token);
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.success.user)
          );
          setIsLoggedIn(true);
          props.setUser(JSON.stringify(response.data.success.user));
        } else {
          const reason = response.data.failure.reason;
          console.log(reason);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Sorry, something went wrong.");
      })
      .finally(() => {
        console.log(localStorage.getItem("token"));
      });
  };

  if (isLoggedIn) {
    return <Redirect to={"/"} />;
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <h3>Log In</h3>

        <div className="form-group">
          <label>User Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="User Name"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary btn-block">Log In</button>
      </form>
    );
  }
}

export default Login;
