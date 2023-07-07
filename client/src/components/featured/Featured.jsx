import "./featured.scss";
import useFetch from "../../hooks/useFetch";

function Featured({ type, setGenre }) {
  const { data, loading } = useFetch(`movie/random?type=${type}`);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="horror">Horror</option>
            <option value="drama">Drama</option>
          </select>
        </div>
      )}

      {loading
        ? "Wait for Loading !!~~"
        : data.map((item) => (
            <>
              <img src={item.img} alt="Error" className="bigImage" />

              <div className="info">
                <img
                  src={item.imgTitle}
                  // src="https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABUZdeG1DrMstq-YKHZ-dA-cx2uQN_YbCYx7RABDk0y7F8ZK6nzgCz4bp5qJVgMizPbVpIvXrd4xMBQAuNe0xmuW2WjoeGMDn1cFO.webp?r=df1"
                  alt="Error"
                />
                <span className="desc">{item.desc}</span>
                <div className="buttons">
                  <button className="play">
                    <i className="fa-solid fa-play"></i>
                    <span>Play</span>
                  </button>

                  <button className="more">
                    <i className="fa-solid fa-circle-info"></i>
                    <span>Info</span>
                  </button>
                </div>
              </div>
            </>
          ))}
    </div>
  );
}

export default Featured;
