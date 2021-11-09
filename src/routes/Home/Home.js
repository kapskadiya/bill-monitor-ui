import { Redirect } from "react-router";
import "./Home.css";

function Home(props) {
  if (props.user != null) {
    return <Redirect to="/billmonitor/dashboard" />;
  } else {
    return (
      <div>
        <h3>User is not logged in.</h3>
      </div>
    );
  }
}

export default Home;
