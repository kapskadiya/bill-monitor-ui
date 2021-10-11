import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router";
import Spinner from "../../components/Spinner";
import "./Login.css";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const options = {
      url: "rest/usermanagement/auth/login",
      method: "POST",
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
          setErrorMessage(reason);
          console.log("reason" + reason);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Sorry, something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Redirect to={"/"} />;
  } else {
    if (isLoading) {
      return <Spinner />;
    } else {
      return (
        <div className="container">
          <div className="outer">
            <div className="inner">
              <form onSubmit={handleSubmit}>
                <h3>Log In</h3>
                {errorMessage && (
                  <p className="alert alert-danger" role="alert">
                    {errorMessage}
                  </p>
                )}
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
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Login;
