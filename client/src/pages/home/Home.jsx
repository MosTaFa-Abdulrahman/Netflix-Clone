import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";

function Home({ type }) {
  const [genre, setGenre] = useState(null);
  const { data, loading } = useFetch(
    `list/get${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`
  );

  return (
    <div className="home">
      <Navbar />
      {loading ? "Loading !!" : <Featured type={type} setGenre={setGenre} />}
      <div className="myDes">
        {data.map((list) => (
          <List list={list} key={list._id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
