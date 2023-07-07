import "./navbar.scss";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  window.onscroll = () => {
    setScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className={scrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <NavLink to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt="Error"
            />
          </NavLink>
          <NavLink to="/series" className="link">
            <span>Series</span>
          </NavLink>
          <NavLink to="/movies" className="link">
            <span>Movies</span>
          </NavLink>

          <span>New and Popular</span>
          <span>My List</span>
        </div>

        <div className="rigth">
          <i className="fa-solid fa-magnifying-glass icon"></i>
          <span>KID</span>
          <i className="fa-solid fa-bell icon"></i>
          <img
            src={
              user.profilePic ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            }
            alt="Error"
          />

          <div className="profile">
            <i className="fa-solid fa-chevron-down icon"></i>
            <div className="options">
              <span>Settings</span>
              <span onClick={handleLogout}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
