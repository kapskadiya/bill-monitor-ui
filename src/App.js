import "./App.css";
import NavBar from "./components/Nav/NavBar";
import { Switch, Route } from "react-router-dom";
import Home from "./routes/Home/Home";
import Login from "./routes/Login/Login";
import Registration from "./routes/Registration/Registration";
import { useEffect, useState } from "react";
import Dashboard from "./routes/Dashboard/Dashboard";
import Account from "./routes/Account/Account";
import axios from "axios";

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

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

      <div className="effective-body">
        <Switch>
          <>
            <Route
              path="/"
              exact={true}
              component={() => <Home user={user} />}
            />
            <Route
              path="/billmonitor/home"
              exact={true}
              component={() => <Home user={user} />}
            />
            <Route
              path="/billmonitor/login"
              exact={true}
              component={() => <Login setUser={setUser} />}
            />
            <Route
              path="/billmonitor/registration"
              exact={true}
              component={Registration}
            />
            <Route
              path="/billmonitor/dashboard"
              exact={true}
              component={() => <Dashboard user={user} />}
            />
            <Route
              path="/billmonitor/manageAccount"
              exact={true}
              component={() => <Account user={user} />}
            />
          </>
        </Switch>
      </div>
    </div>
  );
}

export default App;
