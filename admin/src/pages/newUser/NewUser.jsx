import "./newUser.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Publish } from "@mui/icons-material";
import axios from "axios";
import { publicRequest } from "../../requestMethod";

function NewUser() {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const navigate = useNavigate();

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

      const newUser = { ...info, profilePic: url };
      await publicRequest.post("auth/register", newUser);
      navigate("/users");
    } catch (error) {
      alert("Please Enter All Fields Sir 🥰");
      console.log(error.message);
    }
  };

  return (
    <div className="newUser">
      <div className="new">
        <div className="newContainer">
          <h1 className="userTitle">newUser</h1>

          <div className="bottom">
            <div className="left">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt="Error"
                className="newUserImg"
              />
            </div>
            <div className="right">
              <form className="userForm">
                <div className="formInput">
                  <label htmlFor="file">
                    <Publish style={{ cursor: "pointer" }} />
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>

                <div className="formInput">
                  <label className="newUserLab">Username: </label>
                  <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    className="newUserInp"
                    required
                    onChange={handleChange}
                  />
                  <label className="newUserLab">Email: </label>
                  <input
                    type="text"
                    placeholder="Email"
                    id="email"
                    className="newUserInp"
                    required
                    onChange={handleChange}
                  />
                  <label className="newUserLab">Password: </label>
                  <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="newUserInp"
                    required
                    onChange={handleChange}
                  />
                </div>

                <button className="newUserBtn" onClick={handleClick}>
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewUser;
