import "./login.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { publicRequest } from "../../requestMethod";

function Login() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const navigate = useNavigate();
  const { error, loading, dispatch } = useContext(AuthContext);

  const handleLoginChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "AUTH_START" });
    try {
      const res = await publicRequest.post("auth/login", credentials);
      console.log(res.data);
      if (res.data.isAdmin) {
        dispatch({ type: "AUTH_SUCCES", payload: res.data });
        navigate("/");
      } else {
        dispatch({
          type: "AUTH_FAILURE",
          payload: { message: "You arn not Admin ~!!" },
        });
        alert("You are not Admin ~!!");
      }
    } catch (err) {
      dispatch({ type: "AUTH_FAILURE", payload: err.response.data });
      alert(err.message);
      console.log(err.message);
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        <div className="loginLeft"></div>

        <div className="loginRight">
          <form className="loginBox" onSubmit={handleLoginClick}>
            <input
              type="text"
              placeholder="Username..."
              id="username"
              required
              onChange={handleLoginChange}
              className="loginInput"
            />
            <input
              type="password"
              placeholder="Password..."
              id="password"
              required
              onChange={handleLoginChange}
              className="loginInput"
            />
            <button className="loginButton" type="submit" disabled={loading}>
              Log In
            </button>

            {error && (
              <div
                style={{
                  color: "red",
                  textAlign: "center",
                  marginTop: "20px",
                  fontSize: "25px",
                }}
              >
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
