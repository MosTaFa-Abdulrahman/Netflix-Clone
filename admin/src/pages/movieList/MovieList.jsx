import "./movieList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { publicRequest } from "../../requestMethod";

function MovieList() {
  const { data } = useFetch("movie/get");

  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`movie/delete/${id}`);
      data.filter((item) => item._id !== id);
      window.location.replace("/movies");
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "desc", headerName: "Desc", width: 200 },
    {
      field: "year",
      headerName: "Year",
      width: 120,
    },
    {
      field: "genre",
      headerName: "Genre",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/movie/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
}

export default MovieList;
