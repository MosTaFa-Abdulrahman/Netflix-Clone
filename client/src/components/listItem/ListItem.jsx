import "./listItem.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { format } from "timeago.js";

function ListItem({ index, item }) {
  const [isHoverd, setIsHoverd] = useState(false);

  const { data, loading } = useFetch(`movie/get/${item}`);
  const navigate = useNavigate();

  const goToWatch = () => {
    navigate("/watch", { state: { movie: data } });
  };

  return (
    <div
      className="listItem"
      onMouseEnter={() => setIsHoverd(true)}
      onMouseLeave={() => setIsHoverd(false)}
      style={{ left: isHoverd && index * 225 - 50 + index * 2.5 }}
    >
      {loading ? (
        "Loading !!"
      ) : (
        <img
          src={
            data?.img ||
            "https://images.pexels.com/photos/320617/pexels-photo-320617.jpeg?auto=compress&cs=tinysrgb&w=600"
          }
          alt=""
        />
      )}

      {isHoverd && (
        <>
          {loading ? (
            "Wait For Loading !!"
          ) : (
            <>
              <video src={data?.trailer} autoPlay={true} loop />

              <div className="itemInfo">
                <div className="itemIcons">
                  <i className="fa-solid fa-play icon" onClick={goToWatch}></i>
                  <i className="fa-solid fa-plus icon"></i>
                  <i className="fa-regular fa-thumbs-up icon"></i>
                  <i className="fa-regular fa-thumbs-down icon"></i>
                </div>

                <div className="itemInfoTop">
                  <span>{format(data?.createdAt)}</span>
                  <span className="limit">+{data?.limit}</span>
                  <span>{data?.year}</span>
                </div>

                <div className="desc">{data?.desc}</div>
                <div className="genre">{data?.genre}</div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ListItem;
