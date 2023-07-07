import "./watch.scss";
import { NavLink, useLocation } from "react-router-dom";

function Watch() {
  const location = useLocation();
  const movie = location.state.movie;
  const trailer =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";

  return (
    <div className="watch">
      <div className="back">
        <NavLink to="/" className="link">
          <i className="fa-solid fa-arrow-left icon"></i>
        </NavLink>
        Home
      </div>

      <video className="video" src={movie?.video} controls />
    </div>
  );
}

export default Watch;
