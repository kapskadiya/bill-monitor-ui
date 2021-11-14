import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router";
import Spinner from "../../components/Spinner/Spinner";
import "./Registration.css";

function Registration() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceList, setServiceList] = useState([
    "DTH",
    "GAS",
    "Broadband",
    "Electrisity",
    "Mobile Recharge",
  ]);
  const [serviceInputList, setServiceInputList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const options = {
      url: "rest/usermanagement/user/add",
      method: "POST",
      data: {
        firstname: firstname,
        lastname: lastname,
        password: password,
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

  function prepareServiceBtns(list) {
    const options = [];

    list.sort();
    for (let i = 0; i < list.length; i++) {
      options.push(
        <button onClick={handleOnClickForService} value={list[i]} key={i}>
          {list[i]}
        </button>
      );
    }
    return options;
  }

  function handleOnClickForService(e) {
    e.preventDefault();

    // Add selected service to the service inputs
    const intupElement = serviceList.filter((item) => item === e.target.value);
    serviceInputList.push(intupElement);

    // Remove selected service from service buttons
    const newServiceList = serviceList.filter(
      (item) => item !== e.target.value
    );
    setServiceList(newServiceList);

    setServiceInputList(serviceInputList);
  }

  function prepareServiceInputList(list) {
    var inputs = [];
    for (let i = 0; i < list.length; i++) {
      inputs.push(
        <div key={i} className="d-flex justify-content-end">
          <input
            type="text"
            className="form-control"
            value={list[i]}
            disabled={true}
          />
          <input type="text" className="form-control" placeholder="value" />
          <button onClick={removeServiceInput} value={list[i]}>
            Remove
          </button>
        </div>
      );
    }

    return inputs;
  }

  function removeServiceInput(e) {
    e.preventDefault();

    const inputList = serviceInputList.filter(
      (item) => String(item) !== e.target.value
    );

    // Add removed service to the service buttons
    serviceList.push(e.target.value);
    setServiceList(serviceList);

    setServiceInputList(inputList);
  }

  if (isRegister) {
    return <Redirect to={"/login"} />;
  } else {
    if (isLoading) {
      return <Spinner />;
    } else {
      return (
        <div className="billmonitor-bg">
          <div className="container">
            <div className="outer">
              <div className="inner custom-width">
                <form onSubmit={handleSubmit}>
                  <h3>Registration</h3>

                  {errorMessage && (
                    <p className="alert alert-danger" role="alert">
                      {errorMessage}
                    </p>
                  )}
                  <div className="form-group">
                    <label>Name</label>
                    <div className="d-flex">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        onChange={(e) => setLastname(e.target.value)}
                      />
                    </div>
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
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Service</label>

                    <div>
                      <label>Add service</label>
                      <div className="service-btn">
                        {prepareServiceBtns(serviceList)}
                      </div>
                    </div>
                    {prepareServiceInputList(serviceInputList)}
                  </div>

                  <button className="btn btn-primary btn-block" type="submit">
                    Register
                  </button>
                </form>
                <a
                  className="font-change d-flex justify-content-center text-center"
                  href="/billmonitor/login">
                  Existing user? Click here
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Registration;
