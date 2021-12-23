import React, { useState, useEffect } from "react";
import { isAutheticated } from "../../auth";
import { getFees, createFees, updateFee, deleteFee } from "./feeApiCalls";
import { getUniversities } from "../University/universityApiCall";
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
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
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
  formControl: {
    minWidth: 120,
    margin: 5,
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
  add_university_button: {
    width: "20ch",
  },
});

const Fee = ({ match }) => {
  const university = match.params.universityId;
  // console.log(university);

  const fields = {
    firstYear: "",
    restFess: "",
    courseDuration: "",
    tuitionFee: "",
    hostelFee: "",
    totalUSD: "",
    totalINR: "",
    loading: false,
    error: false,
  };
  const [fees, setFees] = useState([]);
  const [universities, setUniversities] = useState("");
  const [firstYearError, setFirstYearError] = useState(false);
  const [restFeesError, setRestFeesError] = useState(false);
  const [courseDurationError, setCourseDurationError] = useState(false);
  const [totalUSDError, setTotalUSDError] = useState(false);
  const [totalINRError, setTotalINRError] = useState(false);
  const { token, id } = isAutheticated();
  const [open, setOpen] = useState(false);
  const [fee, setFee] = useState(fields);

  console.log(fees);

  const {
    firstYear,
    restFess,
    courseDuration,
    tuitionFee,
    hostelFee,
    totalUSD,
    totalINR,
    loading,
    error,
  } = fee;

  // for opening dilog
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setFee(fields);
  };

  const preload = () => {
    // console.log(university);
    getFees(university).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setFees(data);
      }
    });
  };

  const getAllUniversities = () => {
    getUniversities(id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setUniversities(data);
      }
    });
  };

  useEffect(() => {
    preload();
    getAllUniversities();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setFirstYearError(false);
    setRestFeesError(false);
    setCourseDurationError(false);
    setTotalINRError(false);
    setTotalUSDError(false);
    if (firstYear === "") {
      setFirstYearError(true);
    }
    if (restFess === "") {
      setRestFeesError(true);
    }
    if (courseDuration === "") {
      setCourseDurationError(true);
    }
    if (totalINR === "") {
      setTotalINRError(true);
    }
    if (totalUSD === "") {
      setTotalUSDError(true);
    }

    if (firstYear && restFess && courseDuration && totalINR && totalUSD) {
      setFee({ ...fee, loading: true });
      createFees(id, token, fee, university)
        .then((data) => {
          setFee({
            ...fee,
            firstYear: "",
            restFess: "",
            courseDuration: "",
            tuitionFee: "",
            hostelFee: "",
            totalUSD: "",
            totalINR: "",
          });
          preload();
          handleClose();
        })
        .catch((err) => {
          setFee({ ...fee, error: true });
        });
    }
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
    const value = event.target.value;
    setFee({ ...fee, [name]: value });
    console.log(event.target.value);
  };

  const deleteFeesByUniversityId = () => {
    // console.log(university, id);
    deleteFee(university, id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else preload();
    });
  };

  const onEdit = (feeId) => {
    console.log(feeId);
    console.log(fees.id);
    if (fees.id === feeId) {
      setFee(fees);
    }
    handleClickOpen();
  };

  const onUpdate = (event) => {
    event.preventDefault();
    setFirstYearError(false);
    setRestFeesError(false);
    setCourseDurationError(false);
    setTotalINRError(false);
    setTotalUSDError(false);
    if (firstYear === "") {
      setFirstYearError(true);
    }
    if (restFess === "") {
      setRestFeesError(true);
    }
    if (courseDuration === "") {
      setCourseDurationError(true);
    }
    if (totalINR === "") {
      setTotalINRError(true);
    }
    if (totalUSD === "") {
      setTotalUSDError(true);
    }
    if (firstYear && restFess && courseDuration && totalINR && totalUSD) {
      setFee({ ...fee, loading: true });
      updateFee(id, token, fee, university)
        .then((data) => {
          console.log(data);
          preload();
          handleClose();
        })
        .catch((err) => {
          setFee({ ...fee, error: true });
        });
    }
  };

  const classes = useStyles();
  return (
    <div className="mainTable">
      <h2 style={{ paddingBottom: "1rem", marginTop: "-2rem" }}>Fees</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>First Year</StyledTableCell>
              <StyledTableCell>Rest Fees</StyledTableCell>
              <StyledTableCell>Course Duration</StyledTableCell>
              <StyledTableCell>Tuition Fee</StyledTableCell>
              <StyledTableCell>Hostel Fee</StyledTableCell>
              <StyledTableCell>Total USD</StyledTableCell>
              <StyledTableCell>Total INR</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>U / D</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell>{fees.firstYear}</StyledTableCell>
              <StyledTableCell>{fees.restFess}</StyledTableCell>
              <StyledTableCell>{fees.courseDuration}</StyledTableCell>
              <StyledTableCell>{fees.tuitionFee}</StyledTableCell>
              <StyledTableCell>{fees.hostelFee}</StyledTableCell>
              <StyledTableCell>{fees.totalUSD}</StyledTableCell>
              <StyledTableCell>{fees.totalINR}</StyledTableCell>
              <StyledTableCell>{formatDate(fees.createdAt)}</StyledTableCell>
              <StyledTableCell>
                <button
                  className="buttonUpdate"
                  onClick={() => {
                    return onEdit(fees.id);
                  }}
                >
                  <CreateIcon className="iconForDelete" />
                </button>
                <button
                  className="buttonDelete"
                  onClick={() => {
                    return deleteFeesByUniversityId();
                  }}
                >
                  <DeleteIcon className="iconForDelete" />
                </button>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Fab
        id="Add_University"
        onClick={handleClickOpen}
        variant="extended"
        color="primary"
      >
        Add Fees
      </Fab>

      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {fee.id ? "Update Fees" : "Add Fees"}
          {loadingMessage()}
          {errorMessage()}
        </DialogTitle>
        <DialogContent className="main_input_field">
          <form>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Country
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={university}
                onChange={handleChange("university")}
                label="University"
              >
                {universities &&
                  universities.map((university) => (
                    <MenuItem key={university.id} value={university.id}>
                      {university.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              onChange={handleChange("firstYear")}
              id="outlined-basic"
              label="FirstYear..."
              value={firstYear}
              required
              error={firstYearError}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("restFess")}
              id="outlined-basic"
              label="Rest Fees..."
              required
              error={restFeesError}
              value={restFess}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("courseDuration")}
              id="outlined-basic"
              label="Course Duration..."
              required
              error={courseDurationError}
              value={courseDuration}
              variant="outlined"
              className={classes.disc_field}
            />
            <TextField
              onChange={handleChange("tuitionFee")}
              id="outlined-basic"
              label="Tuition Fee..."
              value={tuitionFee}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("hostelFee")}
              id="outlined-basic"
              label="Hostel Fee..."
              value={hostelFee}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("totalUSD")}
              id="outlined-basic"
              label="Total USD..."
              required
              error={totalUSDError}
              value={totalUSD}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("totalINR")}
              id="outlined-basic"
              label="Total INR..."
              required
              error={totalINRError}
              value={totalINR}
              variant="outlined"
              className={classes.text_field}
            />

            <DialogActions>
              <Button
                className={classes.add_university_button}
                color="primary"
                variant="contained"
                onClick={fee.id ? onUpdate : onSubmit}
                endIcon={<AddIcon />}
              >
                {fee.id ? "Update" : "Add"}
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

export default Fee;
