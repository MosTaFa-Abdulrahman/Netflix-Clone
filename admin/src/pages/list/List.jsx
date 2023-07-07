import "./list.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { publicRequest } from "../../requestMethod";

function List() {
  const [listt, setListt] = useState({});
  const location = useLocation();
  const list = location.state.list;
  const navigate = useNavigate();

  const handleChange = (e) =>
    setListt((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await publicRequest.put(`list/update/${list._id}`, listt);
      navigate("/lists");
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(listt);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newList">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{list._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">type:</span>
              <span className="productInfoValue">{list.type}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{list.genre}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>List Title</label>
            <input
              type="text"
              className="listUpdateInput"
              placeholder={list.title}
              required
              name="title"
              onChange={handleChange}
            />

            <label>Type</label>
            <select name="type" onChange={handleChange}>
              <optgroup label="Type" />
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
            <label>Genre</label>
            <select name="genre" onChange={handleChange}>
              <optgroup label="Genre" />
              <option value="comedy">Comedy</option>
              <option value="horror">Horror</option>
              <option value="crime">Crime</option>
              <option value="drama">Drama</option>
            </select>
          </div>

          <div className="productFormRight">
            <button className="productButton" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default List;
