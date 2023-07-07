import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import MovieList from "./pages/movieList/MovieList";
import Movie from "./pages/movie/Movie";
import NewMovie from "./pages/newMovie/NewMovie";
import Login from "./pages/login/Login";
import { React, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import NotFound from "./pages/notFound/NotFound";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";
// import UploadWidget from "./components/UploadWidget";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />

          <Route
            path="/users"
            element={user ? <UserList /> : <Navigate to="/login" />}
          />
          <Route
            path="/user/:userId"
            element={user ? <User /> : <Navigate to="/login" />}
          />
          <Route
            path="/newUser"
            element={user ? <NewUser /> : <Navigate to="/login" />}
          />

          <Route
            path="/movies"
            element={user ? <MovieList /> : <Navigate to="/login" />}
          />
          <Route
            path="/movie/:movieId"
            element={user ? <Movie /> : <Navigate to="/login" />}
          />
          <Route
            path="/newMovie"
            element={user ? <NewMovie /> : <Navigate to="/login" />}
          />

          <Route
            path="/lists"
            element={user ? <ListList /> : <Navigate to="/login" />}
          />
          <Route
            path="/list/:listId"
            element={user ? <List /> : <Navigate to="/login" />}
          />
          <Route
            path="/newList"
            element={user ? <NewList /> : <Navigate to="/login" />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

// https://recharts.org/en-US/
