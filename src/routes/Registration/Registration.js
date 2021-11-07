import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router";
import Spinner from "../../components/Spinner/Spinner";
import "./Registration.css";

function Registration() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobileno, setMobileno] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const options = {
      url: "rest/usermanagement/user/add",
      method: "POST",
      data: {
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
        mobileNo: mobileno,
        email: email,
      },
    };

    axios(options)
      .then((response) => {
        if (response.data.success.isSaved) {
          setIsRegister(true);
        } else {
          const reason = response.data.failure.reason;
          setErrorMessage(reason);
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

  if (isRegister) {
    return <Redirect to={"/login"} />;
  } else {
    if (isLoading) {
      return <Spinner />;
    } else {
      return (
        <div className="container">
          <div className="outer">
            <div className="inner">
              <form onSubmit={handleSubmit}>
                <h3>Registration</h3>

                {errorMessage && (
                  <p className="alert alert-danger" role="alert">
                    {errorMessage}
                  </p>
                )}
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>

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

                <div className="form-group">
                  <label>Mobile Number</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Mobile Number"
                    onChange={(e) => setMobileno(e.target.value)}
                  />
                </div>

                <button className="btn btn-primary btn-block" type="submit">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Registration;
