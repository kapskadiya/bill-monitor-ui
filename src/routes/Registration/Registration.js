import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState, useEffect } from "react";
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
  const [serviceList, setServiceList] = useState([]);
  const [serviceInputList, setServiceInputList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const options = {
      url: "rest/billtype/getAll",
      method: "GET",
    };

    axios(options)
      .then((response) => {
        if (response.data.success && response.data.data != null) {
          const dataList = response.data.data;
          const tempServiceList = [];
          dataList.forEach((service) => {
            tempServiceList.push(service.type);
          });

          setServiceList(tempServiceList);
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
          if (error.response.status === 401) {
            message = "User is not authenticated";
          } else {
            message = error.response.data.message;
          }
        }
        setErrorMessage(message);
      });

    setIsLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const options = {
      url: "rest/admin/user/create",
      method: "POST",
      data: {
        firstname: firstname,
        lastname: lastname,
        password: password,
        email: email,
        services: serviceInputList,
      },
    };

    axios(options)
      .then((response) => {
        if (response.data.success) {
          alert("User is successfully register!");
          setIsRegister(true);
        } else {
          const reason = response.data.message;
          setErrorMessage(reason);
          console.log("reason" + reason);
        }
      })
      .catch((error) => {
        let message = "Sorry, something went wrong.";
        if (error.response) {
          if (error.response.status === 404) {
            message = "User is not found";
          } else if (error.response.status === 401) {
            message = "Invalid authentication";
          } else {
            message = error.response.data.message;
          }
        }
        setErrorMessage(message);
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

    serviceInputList.push({ name: intupElement[0], number: "" });

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
        <div key={i} className="form-group">
          <label>{list[i].name}</label>
          <div className="d-flex justify-content-end">
            <input
              key={i}
              type="text"
              className="form-control"
              placeholder="value"
              onChange={(e) => updateServiceValue(list[i].name, e.target.value)}
              value={list[i].value}
            />

            <div className="icon">
              <FontAwesomeIcon
                onClick={() => removeServiceInput(list[i].name)}
                icon={faMinusCircle}
              />
            </div>
          </div>
        </div>
      );
    }

    return inputs;
  }

  function removeServiceInput(val) {
    const service = String(val);

    const inputList = serviceInputList.filter((item) => item.name !== service);

    // Add removed service to the service buttons
    serviceList.push(service);
    setServiceList(serviceList);

    setServiceInputList(inputList);
  }

  function updateServiceValue(name, number) {
    const arr = [...serviceInputList];
    const obj = arr.find((o) => o.name === String(name));

    obj.number = number;
    setServiceInputList(arr);
  }

  if (isRegister) {
    return <Redirect to={"/billmonitor/login"} />;
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
