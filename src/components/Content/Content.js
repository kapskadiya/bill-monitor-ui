import Settings from "../Settings/Settings";
import UserDetail from "../UserDetail/UserDetail";
import "./Content.css";

function Content(props) {
  if (props.content != null && props.content === "details") {
    return <UserDetail user={props.user} />;
  } else if (props.content != null && props.content === "settings") {
    return <Settings user={props.user} setUser={props.setUser} />;
  }
}

export default Content;
