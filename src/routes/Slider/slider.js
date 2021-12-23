import React, { useState, useEffect } from "react";
import { isAutheticated } from "../../auth";
import { getSliders, createSlider, deleteSlider } from "./sliderApiCall";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "./slider.css";
import { PATH } from "../../backend";
import formatDate from "../../util";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "blue",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  mainTable: {
    marginRight: "20ch",
    marginLeft: "20ch",
  },
  table: {
    minWidth: 700,
  },
  file_field: {
    margin: 5,
  },
  text_field: {
    width: "32ch",
    margin: 5,
  },
  disc_field: {
    margin: 5,
  },
});

const Slider = () => {
  const [sliders, setSliders] = useState([]);
  const { token, id } = isAutheticated();
  const [open, setOpen] = useState(false);
  const [slider, setSlider] = useState({
    photo: "",
    loading: false,
    error: false,
  });

  const { photo, loading, error } = slider;
  // for opening dilog
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // close dilog box

  const preload = () => {
    getSliders().then((data) => {
      if (data.error) {
        setSlider({ ...slider, error: data.error });
      } else {
        setSliders(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setSlider({ ...slider, loading: true });
    createSlider(id, token, slider).then((data) => {
      setSlider({
        ...slider,
        photo: "",
      });
      preload();
      handleClose();
    });
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h4>Loading...</h4>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      error && (
        <div className="alert alert-info">
          <h2>Something went wrong</h2>
        </div>
      )
    );
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setSlider({ ...slider, [name]: value });
  };

  const deleteSliderById = (sliderId) => {
    deleteSlider(sliderId, id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  const classes = useStyles();

  return (
    <div className={classes.mainTable}>
      <h2 style={{ paddingBottom: "1rem", marginTop: "-2rem" }}>Slider</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Picture</StyledTableCell>
              <StyledTableCell>Time</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sliders.map((slider, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>
                  <img height="100px" src={`${PATH}/${slider.name}`} alt="" />
                </StyledTableCell>
                <StyledTableCell>
                  {formatDate(slider.createdAt)}
                </StyledTableCell>
                <StyledTableCell>
                  <button
                    className="buttonDelete"
                    onClick={() => {
                      return deleteSliderById(slider.id);
                    }}
                  >
                    <DeleteIcon className="iconForDelete" />
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* dilog button opening and clossing */}
      <Fab
        id="Add_Slider"
        onClick={handleClickOpen}
        variant="extended"
        color="primary"
      >
        Add Slider
      </Fab>

      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Add Country
          {loadingMessage()}
          {errorMessage()}
        </DialogTitle>
        <DialogContent className="main_input_field">
          <form>
            <TextField
              onChange={handleChange("photo")}
              type="file"
              name="picture"
              accept="image"
              variant="outlined"
              className={classes.file_field}
              fullWidth
            />

            <DialogActions>
              <Button
                className="add_Button"
                color="primary"
                variant="contained"
                onClick={onSubmit}
                endIcon={<AddIcon />}
              >
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Slider;
