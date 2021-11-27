import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Spinner from "../Spinner/Spinner";
import update from "immutability-helper";

function UserDetail(props) {
  const rendered = useRef(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [services, setServices] = useState();

  useEffect(() => {
    setIsLoading(true);

    async function getUserDetails() {
      if (props.user != null) {
        const user = JSON.parse(props.user);
        const options = {
          url: "rest/admin/user/email/" + user.email,
          method: "GET",
        };

        axios(options)
          .then((response) => {
            if (!rendered.current) {
              if (response.data.data != null) {
                const userData = response.data.data;
                setFirstname(userData.firstname);
                setLastname(userData.lastname);
                setEmail(userData.email);
                setServices(userData.services);
              } else {
                setErrorMessage("User is not found");
              }
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
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }

    getUserDetails();

    return () => {
      rendered.current = true;
    };
  }, [props.user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const options = {
      url: "rest/admin/user/update",
      method: "PUT",
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        services: services,
      },
    };

    axios(options)
      .then((response) => {
        if (response.data.success) {
          setIsUpdated(true);
          setIsDisabled(true);
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function updateServices(key, val) {
    var data = services;

    var index = data.findIndex(function (c) {
      return c.name === key;
    });

    var updatedService = update(data[index], { number: { $set: val } });

    var newData = update(data, {
      $splice: [[index, 1, updatedService]],
    });
    setServices(newData);
  }

  const prepareServiceInputData = () => {
    var serviceInput = [];

    if (services != null) {
      Object.keys(services).forEach((key, i) => {
        serviceInput.push(
          <div key={key} className="form-group">
            <label>{services[key].name}</label>
            <input
              type="text"
              className="form-control"
              value={services[key].number}
              disabled={isDisabled}
              onChange={(e) =>
                updateServices(services[key].name, e.target.value)
              }
            />
          </div>
        );
      });
    }
    return serviceInput;
  };

  if (isLoading) {
    console.log("userDetails--Spinner");
    return (
      <div className="content-body">
        <Spinner />
      </div>
    );
  } else {
    console.log("userDetails");
    return (
      <div className="content-body">
        <div className="container">
          <div className="outer">
            <div className="inner">
              <form onSubmit={handleSubmit}>
                {errorMessage && (
                  <p className="alert alert-danger" role="alert">
                    {errorMessage}
                  </p>
                )}

                {isUpdated && (
                  <p className="alert alert-success" role="alert">
                    Data is updated!
                  </p>
                )}

                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={firstname}
                    disabled={isDisabled}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={lastname}
                    disabled={isDisabled}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    disabled={isDisabled}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {prepareServiceInputData()}
                <div className="btn-group d-flex">
                  <button
                    hidden={isDisabled}
                    className="btn btn-primary"
                    type="submit">
                    Update
                  </button>
                  <button
                    hidden={isDisabled}
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => setIsDisabled(true)}>
                    Cancle
                  </button>
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={() => setIsDisabled(false)}
                  hidden={!isDisabled}>
                  Update the details
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserDetail;
