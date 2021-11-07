import "./Sidebar.css";

function Sidebar(props) {
  let changeContent = (val) => {
    props.setContent(val);
  };

  return (
    <nav id="sidebar">
      <ul className="list-unstyled components">
        <p>Manage Account</p>
        <li>
          <button
            className="btn btn-link"
            onClick={() => changeContent("details")}>
            Your Details
          </button>
        </li>
        <li>
          <button
            className="btn btn-link"
            onClick={() => changeContent("settings")}>
            Settings
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
