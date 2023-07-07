import "./topbar.css";
import { NotificationsNone, Language } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <NavLink to="/" className="link">
            <span className="logo">Darshadmin</span>
          </NavLink>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          {user ? (
            <>
              <img
                src={
                  user.profilePic ||
                  "https://cdn.pixabay.com/photo/2016/08/27/11/16/contractor-1623889_640.jpg"
                }
                alt=""
                className="topAvatar"
              />
              <div style={{ marginLeft: "5px" }}>{user.username}</div>
              <button className="topLogout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login">
              <button className="topLogin">Login</button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
