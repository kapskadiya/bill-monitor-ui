import { Redirect } from "react-router";
import "./Home.css";

function Home(props) {
  if (props.user != null) {
    return <Redirect to="/billmonitor/dashboard" />;
  } else {
    return (
      <div className="center">
        <h1> Welcome to the Bill Monitor</h1>
        <h2> Analysis and Manage tool for all kind of bills </h2>

        <h3>You will love it. Try once!</h3>
        <a href="/billmonitor/registration">Register</a>
      </div>
    );
  }
}

export default Home;
