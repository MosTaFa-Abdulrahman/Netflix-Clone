import "./featuredInfo.css";
import { LocalMovies, WbIridescent, Person } from "@mui/icons-material";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethod";
import { NavLink } from "react-router-dom";

function FeaturedInfo() {
  const [movies, setMovies] = useState([]);
  const { data } = useFetch("user/get");

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await publicRequest.get("movie/get");
        setMovies(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMovies();
  }, []);

  return (
    <div className="featured">
      <NavLink to="/users" className="link" style={{ width: "100%" }}>
        <div className="featuredItem">
          <span className="featuredTitle">Users</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{data.length}</span>
            <span className="featuredMoneyRate">
              <Person
                className="featuredIcon negative"
                style={{ color: "green" }}
              />
            </span>
          </div>
          <span className="featuredSub">Number Of Users 🥰</span>
        </div>
      </NavLink>
      <NavLink to="/movies" className="link" style={{ width: "100%" }}>
        <div className="featuredItem">
          <span className="featuredTitle">Movies</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{movies.length}</span>
            <span className="featuredMoneyRate">
              <LocalMovies
                className="featuredIcon negative"
                style={{ color: "blue" }}
              />
            </span>
          </div>
          <span className="featuredSub">Number Of Movies 🥰</span>
        </div>
      </NavLink>
      <NavLink to="/" className="link" style={{ width: "100%" }}>
        <div className="featuredItem">
          <span className="featuredTitle">Balancing</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">100% </span>
            <span className="featuredMoneyRate">
              <WbIridescent className="featuredIcon" />
            </span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div>
      </NavLink>
    </div>
  );
}

export default FeaturedInfo;
