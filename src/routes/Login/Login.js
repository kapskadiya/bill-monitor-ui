import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router";
import Spinner from "../../components/Spinner/Spinner";
import "./Login.css";

function Login(props) {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const options = {
      url: "rest/admin/auth/login",
      method: "POST",
      data: {
        email: email,
        password: password,
      },
    };

    axios(options)
      .then((response) => {
        if (response.data.success && response.data.data.token != null) {
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.data.user));

          setIsLoggedIn(true);

          props.setUser(JSON.stringify(response.data.data.user));
        } else {
          const reason = response.data.message;
          setErrorMessage(reason);
          console.log("reason" + reason);
        }
      })
      .catch((error) => {
        console.log(error);
        let message = "Sorry, something went wrong.";
        if (error.response) {
          if (error.response.status === 404) {
            message = "User is not found";
          } else if (error.response.status === 401) {
            message = "Invalid authentication";
          }
        }
        setErrorMessage(message);
      });
    setIsLoading(false);
  };

  if (isLoggedIn) {
    return <Redirect to={"/billmonitor/home"} />;
  } else {
    if (isLoading) {
      return <Spinner />;
    } else {
      return (
        <div className="billmonitor-bg">
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
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
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

                <a
                  className="font-change d-flex justify-content-center text-center"
                  href="/billmonitor/registration">
                  User is not register? Go to here!
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Login;
