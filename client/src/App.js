import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Watch from "./pages/watch/Watch";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import NotFound from "./pages/notFound/NotFound";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ backgroundColor: "#0b0b0b" }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />

          {user && (
            <>
              <Route path="/movies" element={<Home type="movie" />} />
              <Route path="/series" element={<Home type="series" />} />
              <Route path="/watch" element={<Watch />} />
            </>
          )}

          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
