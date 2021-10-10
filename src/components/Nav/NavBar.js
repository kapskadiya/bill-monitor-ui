import { Link } from "react-router-dom";

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
          <Link className="nav-link" to={"/login"}>
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/registration"}>
            Registration
          </Link>
        </li>
      </ul>
    );
  } else {
    authButton = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to={"/"} onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top">
      <div className="container">
        <div className="float-left">
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
