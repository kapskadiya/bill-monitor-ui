import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router";
import Spinner from "../Spinner/Spinner";

function Settings(props) {
  const [deleted, setDeleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();

    setIsLoading(true);
    if (props.user != null) {
      const user = JSON.parse(props.user);
      const options = {
        url: "rest/admin/user/delete?email=" + user.email,
        method: "DELETE",
      };

      axios(options)
        .then((response) => {
          if (response.data != null && response.data.success) {
            setDeleted(true);
          } else {
            setErrorMessage("User is not found");
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
  };

  const handleLogout = () => {
    localStorage.clear();
    props.setUser(null);
  };

  const prepareDeleteDisplay = () => {
    if (props.user.isDeleted) {
      return (
        <div className="d-flex justify-content-between mb-3">
          <p>Delete your account</p>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={(e) => handleDelete(e)}>
            DELETE
          </button>
        </div>
      );
    } else {
      return <span></span>;
    }
  };

  if (deleted) {
    handleLogout();
    return <Redirect to={"/login"} />;
  } else {
    if (isLoading) {
      console.log("userDetails--Spinner");
      return (
        <div className="content-body">
          <Spinner />
        </div>
      );
    } else {
      return (
        <div className="content-body">
          <div className="container">
            {errorMessage && (
              <p className="alert alert-danger" role="alert">
                {errorMessage}
              </p>
            )}
            <div className="d-flex justify-content-between mb-3 mt-3">
              <p>Change the language</p>
              <select
                aria-label="Language Dropdown"
                name="lang"
                defaultValue="english"
                id="lang">
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="spanish">Spanish</option>
              </select>
            </div>
            {prepareDeleteDisplay}
          </div>
        </div>
      );
    }
  }
}

export default Settings;
