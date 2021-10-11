import Dashboard from "../Dashboard/Dashboard";
import "./Home.css";

function Home(props) {
  if (props.user != null) {
    const user = JSON.parse(props.user);
    return (
      <div>
        <h3>
          Hi {user.firstname} {user.lastname}
        </h3>
        <Dashboard user={user} />
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
