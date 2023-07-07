import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { publicRequest } from "../../requestMethod";

function UserList() {
  const { data } = useFetch("user/get");

  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`user/delete/${id}`);
      data.filter((item) => item._id !== id);
      window.location.replace("/users");
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={
                params.row.profilePic ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              }
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
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

export default UserList;
