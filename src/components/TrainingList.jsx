import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { IconButton } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTraining from "./AddTraining";

function TrainingList() {
  const [trainings, setTrainings] = useState([]);

  const [open, setOpen] = useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    fetchTrainings();
  }, []);

  function fetchTrainings() {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  }

  function deleteTraining(id) {
    if (window.confirm("Are you sure?")) {
      var url = "https://customerrest.herokuapp.com/api/trainings/" + id;
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) fetchTrainings();
          else alert("Something went wrong");
          setOpen(true);
        })
        .catch((err) => console.error(err));
    }
  }

  const [columnDefs] = useState([
    { field: "date", sortable: true, filter: true, width: 300 },
    { field: "duration", sortable: true, filter: true, width: 150 },
    { field: "activity", sortable: true, filter: true },
    {
      field: "customer.firstname",
      headerName: "Customer",
      sortable: true,
      filter: true,
      width: 130,
    },
    {
      field: "customer.lastname",
      headerName: "",
      sortable: true,
      filter: true,
      width: 150,
    },
    {
      field: "id",
      headerName: "",
      cellRenderer: (params) => (
        <IconButton
          color="error"
          onClick={() => deleteTraining(params.value)}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ]);

  return (
    <>
      <AddTraining></AddTraining>
      <div
        className="ag-theme-material"
        style={{ height: 800, width: "100vw" }}
      >
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={20}
          suppressCellFocus={true}
        ></AgGridReact>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Row successfully deleted
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}

export default TrainingList;
