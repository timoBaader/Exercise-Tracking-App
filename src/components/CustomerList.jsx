import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { IconButton } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  const [open, setOpen] = useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  function fetchCustomers() {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  }

  function deleteCustomer(link) {
    if (window.confirm("Are you sure?")) {
      fetch(link, { method: "DELETE" })
        .then((response) => {
          if (response.ok) fetchCustomers();
          else alert("Something went wrong");
          setOpen(true);
        })
        .catch((err) => console.error(err));
    }
  }

  const [columnDefs] = useState([
    { field: "firstname", sortable: true, filter: true },
    { field: "lastname", sortable: true, filter: true },
    { field: "postcode", sortable: true, filter: true },
    { field: "city", sortable: true, filter: true },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },
    {
      field: "links.0.href",
      headerName: "",
      cellRenderer: (params) => (
        <IconButton
          color="error"
          onClick={() => deleteCustomer(params.value)}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
    {
      headerName: "",
      width: 120,
      field: "links.0.href",
      cellRenderer: (params) => (
        <EditCustomer params={params} fetchCustomers={fetchCustomers} />
      ),
    },
    {
      headerName: "Add training",
      width: 120,
      field: "links.0.href",
      cellRenderer: (params) => <AddTraining params={params} />,
    },
    {
      field: "links.2.href",
      headerName: "",
      cellRenderer: (params) => <Button href={params.value}>Trainings</Button>,
      width: 500,
    },
  ]);

  return (
    <>
      <AddCustomer fetchCustomers={fetchCustomers}></AddCustomer>
      <div
        className="ag-theme-material"
        style={{ height: 800, width: "100vw" }}
      >
        <AgGridReact
          rowData={customers}
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

export default CustomerList;
