import axios from "axios";
import { useState } from "react";
import "./Registration.css";

function Registration() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobileno, setMobileno] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const options = {
      url: "rest/usermanagement/user/add",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
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
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Registration</h3>

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

      <button className="btn btn-primary btn-block">Sign Up</button>
    </form>
  );
}

export default Registration;
