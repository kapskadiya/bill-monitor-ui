import { Redirect } from "react-router";
import "./Home.css";

function Home(props) {
  if (props.user != null) {
    return (
      <div>
        <Redirect to="/billmonitor/dashboard" />
      </div>
    );
  } else {
    return (
      <div>
        <h3>User is not logged in.</h3>
      </div>
    );
  }
}

export default Home;
