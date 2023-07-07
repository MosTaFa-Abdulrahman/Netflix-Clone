import "./login.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
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
      if (res.data) {
        dispatch({ type: "AUTH_SUCCES", payload: res.data });
        navigate("/");
      } else {
        dispatch({
          type: "AUTH_FAILURE",
          payload: { message: "You arn not User ~!!" },
        });
        alert("You Should Create Account ☻");
      }
    } catch (err) {
      dispatch({ type: "AUTH_FAILURE", payload: err.response.data });
      alert(err.message);
      console.log(err.message);
    }
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>

      <div className="container">
        <form onSubmit={handleLoginClick}>
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Username... "
            id="username"
            required
            onChange={handleLoginChange}
          />
          <input
            type="password"
            placeholder="Password... "
            id="password"
            required
            onChange={handleLoginChange}
          />

          <button className="loginButton" type="submit" disabled={loading}>
            Login
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

          <span>
            New to Netflix?{" "}
            <NavLink to="/register" className="link">
              <b>Register now.</b>
            </NavLink>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
