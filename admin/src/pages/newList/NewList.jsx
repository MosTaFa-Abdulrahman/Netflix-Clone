import "./newList.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { publicRequest } from "../../requestMethod";

function NewList() {
  const [list, setList] = useState({});
  const { data } = useFetch("movie/get");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setList((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await publicRequest.post("list/create", list);
      navigate("/lists");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              className="listUpdateInput"
              placeholder="List Title... "
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <select name="genre" onChange={handleChange}>
              <optgroup label="Genre" />
              <option value="comedy">Comedy</option>
              <option value="horror">Horror</option>
              <option value="crime">Crime</option>
              <option value="drama">Drama</option>
            </select>
          </div>

          {/* Very Very Important */}
          <div className="addProductItem">
            <label>Type</label>
            <select name="type" onChange={handleChange}>
              <optgroup label="Type" />
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>

        <div className="formRight">
          <div className="addProductItem">
            <label>Content</label>
            <select
              multiple
              name="content"
              onChange={handleSelect}
              style={{ height: "280px" }}
            >
              {data.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Very Very Important */}

        <button className="addProductButton" onClick={handleCreate}>
          Create
        </button>
      </form>
    </div>
  );
}

export default NewList;
