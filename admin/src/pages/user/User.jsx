import "./user.css";
import { MailOutline, Publish } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import axios from "axios";
import { publicRequest } from "../../requestMethod";

function User() {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const navigate = useNavigate();

  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const { data, loading } = useFetch(`user/get/${userId}`);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dkqpzws52/image/upload",
        data
      );
      const { url } = uploadRes.data;

      const updateUser = { ...info, profilePic: url };
      await publicRequest.put(`user/update/${userId}`, updateUser);
      navigate("/users");
    } catch (error) {
      alert("Please Enter All Fields Sir 🥰");
      console.log(error.message);
    }
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>

      <div className="userContainer">
        {loading ? (
          "Wait For Loading ~~!!"
        ) : (
          <div className="userShow">
            <div className="userShowTop">
              <img
                src={
                  data.profilePic ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                }
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{data.username}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{data.email}</span>
              </div>
            </div>
          </div>
        )}

        {/* Edit User Here */}
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={data.username}
                  className="userUpdateInput"
                  id="username"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={data.email}
                  className="userUpdateInput"
                  id="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password... "
                  className="userUpdateInput"
                  id="password"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  src={file ? URL.createObjectURL(file) : data.profilePic}
                  className="userUpdateImg"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish style={{ cursor: "pointer" }} />
                </label>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <button className="userUpdateButton" onClick={handleClick}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default User;
