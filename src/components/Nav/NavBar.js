import { Link } from "react-router-dom";
import logo from "../../resources/bill-monitor.png";

function NavBar(props) {
  const handleLogout = () => {
    localStorage.clear();
    props.setUser(null);
  };

  let authButton = null;

  if (props.user == null) {
    authButton = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to={"/billmonitor/login"}>
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/billmonitor/registration"}>
            Registration
          </Link>
        </li>
      </ul>
    );
  } else {
    const user = JSON.parse(props.user);
    authButton = (
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <button
            className="nav-link dropdown-toggle btn btn-link"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            Profile
          </button>
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="navbarDropdownMenuLink">
            <p className="dropdown-item">
              Hi {user.firstname} {user.lastname}
            </p>
            <a className="dropdown-item" href={"/billmonitor/manageAccount"}>
              Manage account
            </a>
            <a className="dropdown-item" href={"/"} onClick={handleLogout}>
              Logout
            </a>
          </div>
        </li>
      </ul>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top">
      <div className="container">
        <div className="float-left">
          <img src={logo} alt="Logo" width="50" height="50"></img>
          <Link className="navbar-brand mb-0" to={"/"}>
            Bill Monitor
          </Link>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent">
          {authButton}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
