import "./listList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { publicRequest } from "../../requestMethod";

function ListList() {
  const { data } = useFetch("list/get");
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`list/delete/${id}`);
      data.filter((item) => item._id !== id);
      window.location.replace("/lists");
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const sendListData = (id, data) => {
    navigate(`/list/${id}`, { state: { list: data } });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "title", headerName: "title", width: 250 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "type", headerName: "type", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <div onClick={() => sendListData(params.row._id, params.row)}>
              <button className="productListEdit">Edit</button>
            </div>
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

export default ListList;
