import "./movie.css";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

function Movie() {
  const location = useLocation();
  const movieId = location.pathname.split("/")[2];
  const { data } = useFetch(`movie/get/${movieId}`);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newMovie">
          <button className="productAddButton">Create</button>
        </Link>
      </div>

      <div className="movie_card" id="bright">
        <div className="info_section">
          <div className="movie_header">
            <img
              src={
                data.img ||
                "https://movieplayer.net-cdn.it/t/images/2017/12/20/bright_jpg_191x283_crop_q85.jpg"
              }
              className="locandina"
              alt=""
            />
            <h1 className="movieTitle">{data.title}</h1>
            <h4 className="movieCreate">Createad At: {data.year}</h4>
            <span className="minutes">
              <b>+</b>
              {data.limit}
            </span>
            <p className="type">{data.genre}</p>
          </div>
          <div className="movie_desc">
            <p className="text">{data.desc}</p>
          </div>
        </div>
        <div className="blur_back bright_back"></div>
      </div>
    </div>
  );
}

export default Movie;
