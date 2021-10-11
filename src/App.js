import "./App.css";
import NavBar from "./components/Nav/NavBar";
import { Switch, Route } from "react-router-dom";
import Home from "./routes/Home/Home";
import Login from "./routes/Login/Login";
import Registration from "./routes/Registration/Registration";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    console.log("App component did mount");
    if (localStorage.getItem("token") != null) {
      setUser(localStorage.getItem("user"));
    }
  }, []);

  return (
    <div className="App">
      {console.log("App component is rendering")}
      <NavBar user={user} setUser={setUser} />

      <Switch>
        <>
          <Route path="/" exact={true} component={() => <Home user={user} />} />
          <Route
            path="/login"
            exact={true}
            component={() => <Login setUser={setUser} />}
          />
          <Route path="/registration" exact={true} component={Registration} />
        </>
      </Switch>
    </div>
  );
}

export default App;
