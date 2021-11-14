import { useState } from "react";
import Content from "../../components/Content/Content";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Account.css";

function Account(props) {
  const [content, setContent] = useState("details");

  if (props.user != null) {
    return (
      <div className="wrapper">
        <Sidebar user={props.user} setContent={setContent} />
        <Content user={props.user} content={content} setUser={props.setUser} />
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

export default Account;
