import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function AddTraining(params) {
  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = React.useState({
    datetime: null,
    activity: "",
    duration: "",
    customer: params.params.value,
  });

  const inputChanged = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (training) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(training),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Training added");
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.error(err));
    setTraining({
      date: null,
      activity: "",
      duration: "",
      customer: "",
    });
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            label="activity"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            label="duration"
            fullWidth
            variant="standard"
          />
          <DateTimePicker
            margin="dense"
            name="datetime"
            fullWidth
            variant="standard"
            label="Date and Time picker"
            value={training.datetime}
            onChange={inputChanged}
            renderInput={(params) => <TextField {...params} />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTraining;
