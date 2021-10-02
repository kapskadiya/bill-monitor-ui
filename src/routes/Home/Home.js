import "./Home.css";

function Home(props) {
  if (props.user != null) {
    const user = JSON.parse(props.user);
    return (
      <div className="home-body">
        <h3>
          Hi {user.firstname} {user.lastname}
        </h3>
      </div>
    );
  } else {
    return (
      <div className="home-body">
        <h3>User is not logged in.</h3>
      </div>
    );
  }
}

export default Home;
