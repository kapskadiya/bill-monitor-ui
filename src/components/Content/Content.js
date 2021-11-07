import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import "./Content.css";

function Content(props) {
  const [loggedInUser, setLoggedInUser] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserDetails();
  }, []);

  function getUserDetails() {
    if (props.user != null) {
      const user = JSON.parse(props.user);
      const options = {
        url: "rest/admin/user/email/" + user.email,
        method: "GET",
      };

      axios(options)
        .then((response) => {
          if (response.data.data != null) {
            setLoggedInUser(response.data.data);
          } else {
            setErrorMessage("User is not found");
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 404) {
            setErrorMessage("User is not found");
          } else {
            setErrorMessage("Sorry, something went wrong.");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (props.content != null && props.content === "details") {
    if (isLoading) {
      return <Spinner />;
    } else {
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

                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={loggedInUser.firstname}
                      disabled={!isUpdate}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={loggedInUser.lastname}
                      disabled={!isUpdate}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={loggedInUser.email}
                      disabled={!isUpdate}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="btn-group d-flex">
                    <button
                      hidden={!isUpdate}
                      className="btn btn-primary"
                      type="submit">
                      Update
                    </button>
                    <button
                      hidden={!isUpdate}
                      className="btn btn-secondary"
                      type="button"
                      onClick={() => setIsUpdate(false)}>
                      Cancle
                    </button>
                  </div>

                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => setIsUpdate(true)}
                    hidden={isUpdate}>
                    Update the details
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="content-body">
        <p>Settings</p>
      </div>
    );
  }
}

export default Content;
