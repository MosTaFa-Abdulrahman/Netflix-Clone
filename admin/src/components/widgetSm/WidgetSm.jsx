import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";
import useFetch from "../../hooks/useFetch";
import { NavLink } from "react-router-dom";

function WidgetSm() {
  const { data, loading } = useFetch("user/get?new=true");

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {loading
          ? "Wait For Loading ~!!"
          : data?.map((item) => (
              <li className="widgetSmListItem" key={item._id}>
                <img
                  src={
                    item.profilePic ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                  }
                  alt=""
                  className="widgetSmImg"
                />
                <div className="widgetSmUser">
                  <span className="widgetSmUsername">{item.username}</span>
                  <span className="widgetSmUserTitle">{item.email}</span>
                </div>
                <NavLink to={`/user/${item._id}`}>
                  <button className="widgetSmButton link">
                    <Visibility className="widgetSmIcon" />
                    Display
                  </button>
                </NavLink>
              </li>
            ))}
      </ul>
    </div>
  );
}

export default WidgetSm;
