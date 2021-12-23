import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../../auth";
import {
  getUniversities,
  getUniversity,
  createUniversity,
  deleteUniversity,
  updateUniversity,
} from "./universityApiCall";
import { getCountrys } from "../Country/countryApiCall";
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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CardMedia from "@material-ui/core/CardMedia";
import { PATH } from "../../backend";
import "./university.css";
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

const University = () => {
  const fields = {
    picture: "",
    name: "",
    facts: "",
    description: "",
    awards: "",
    achievements: "",
    affiliatedBy: "",
    recent: "",
    climate: "",
    why: "",
    nowDays: "",
    figures: "",
    faculties: "",
    trainingFields: "",
    general: "",
    duration: "",
    loading: false,
    error: false,
    country: "",
  };

  const [universities, setUniversities] = useState([]);
  const [countrys, setCountrys] = useState("");
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const { token, id } = isAutheticated();
  const [open, setOpen] = useState(false);
  const [university, setUniversity] = useState(fields);

  const {
    // picture,
    name,
    description,
    facts,
    awards,
    achievements,
    affiliatedBy,
    recent,
    climate,
    why,
    nowDays,
    figures,
    faculties,
    trainingFields,
    general,
    duration,
    loading,
    error,
    country,
  } = university;

  // for opening dilog
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setUniversity(fields);
  };

  const preload = () => {
    getUniversities(id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // console.log(data);
        setUniversities(data);
      }
    });
  };

  const getAllCountries = () => {
    getCountrys(id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCountrys(data);
      }
    });
  };

  useEffect(() => {
    preload();
    getAllCountries();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setNameError(false);
    setDescriptionError(false);

    if (name === "") {
      setNameError(true);
    }
    if (description === "") {
      setDescriptionError(true);
    }

    if (name && description) {
      setUniversity({ ...university, loading: true });
      createUniversity(id, token, university, country)
        .then((data) => {
          // console.log(data);
          setUniversity({
            ...university,
            picture: "",
            name: "",
            description: "",
            facts: "",
            awards: "",
            achievements: "",
            affiliatedBy: "",
            recent: "",
            climate: "",
            why: "",
            nowDays: "",
            figures: "",
            faculties: "",
            trainingFields: "",
            general: "",
            duration: "",
            country: "",
          });
          preload();
          handleClose();
        })
        .catch((err) => {
          setUniversity({ ...university, error: true });
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
    const value =
      name === "picture" ? event.target.files[0] : event.target.value;
    setUniversity({ ...university, [name]: value });
    console.log(event.target.value);
  };

  const deleteUniversityById = (universityId) => {
    deleteUniversity(universityId, id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  const onEdit = (universityId) => {
    const index = universities.findIndex((u, i) => u.id === universityId);
    setUniversity(universities[index]);
    handleClickOpen();
  };

  const onUpdate = (event) => {
    event.preventDefault();
    setNameError(false);
    setDescriptionError(false);

    if (name === "") {
      setNameError(true);
    }
    if (description === "") {
      setDescriptionError(true);
    }
    if (name && description) {
      setUniversity({ ...university, loading: true });
      updateUniversity(university.id, id, token, university)
        .then((data) => {
          console.log(data);
          preload();
          handleClose();
        })
        .catch((err) => {
          setUniversity({ ...university, error: true });
        });
    }
  };

  const classes = useStyles();

  // short the paragraph
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <div className="mainTable">
      <h2 style={{ paddingBottom: "1rem", marginTop: "-2rem" }}>University</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Picture</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Facts</StyledTableCell>
              <StyledTableCell>Awards</StyledTableCell>
              <StyledTableCell>Achievements</StyledTableCell>
              <StyledTableCell>Climate</StyledTableCell>
              <StyledTableCell>Time</StyledTableCell>
              <StyledTableCell>Fee</StyledTableCell>
              <StyledTableCell>U / D</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {universities.map((university, index) => {
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>
                    <img
                      height="80px"
                      src={`${PATH}/${university.picture}`}
                      alt=""
                    />
                  </StyledTableCell>
                  <StyledTableCell>{university.name}</StyledTableCell>
                  <StyledTableCell>
                    {truncate(university.facts, 150)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {truncate(university.awards, 150)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {truncate(university.achievements, 150)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {truncate(university.climate, 150)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {formatDate(university.createdAt)}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Link to={`/university/fee/${university.id}`}>Fees</Link>
                  </StyledTableCell>
                  <StyledTableCell>
                    <button
                      className="buttonUpdate"
                      onClick={() => {
                        onEdit(university.id);
                      }}
                    >
                      <CreateIcon className="iconForDelete" />
                    </button>
                    <button
                      className="buttonDelete"
                      onClick={() => {
                        return deleteUniversityById(university.id);
                      }}
                    >
                      <DeleteIcon className="iconForDelete" />
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* dilog button opening and clossing */}
      <Fab
        id="Add_University"
        onClick={handleClickOpen}
        variant="extended"
        color="primary"
      >
        Add University
      </Fab>

      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {university.id ? "Update university" : "Add university"}
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
                value={country}
                onChange={handleChange("country")}
                label="Country"
              >
                {countrys &&
                  countrys.map((country) => (
                    <MenuItem key={country.id} value={country.id}>
                      {country.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              onChange={handleChange("picture")}
              type="file"
              name="picture"
              accept="image"
              variant="outlined"
              className={classes.file_field}
              fullWidth
            />
            <TextField
              onChange={handleChange("name")}
              id="outlined-basic"
              label="University Name..."
              required
              error={nameError}
              value={name}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("facts")}
              id="outlined-basic"
              label="Facts..."
              value={facts}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("description")}
              id="outlined-basic"
              label="Description..."
              value={description}
              required
              error={descriptionError}
              multiline
              rows="3"
              fullWidth
              variant="outlined"
              className={classes.disc_field}
            />
            <TextField
              onChange={handleChange("awards")}
              id="outlined-basic"
              label="Awards..."
              value={awards}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("achievements")}
              id="outlined-basic"
              label="Achievements..."
              value={achievements}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("affiliatedBy")}
              id="outlined-basic"
              label="Affiliated By..."
              value={affiliatedBy}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("recent")}
              id="outlined-basic"
              label="Recent..."
              value={recent}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("climate")}
              id="outlined-basic"
              label="Climate..."
              value={climate}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("why")}
              id="outlined-basic"
              label="Why..."
              value={why}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("nowDays")}
              id="outlined-basic"
              label="Now Days..."
              value={nowDays}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("figures")}
              id="outlined-basic"
              label="Figures..."
              value={figures}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("faculties")}
              id="outlined-basic"
              label="Faculties..."
              value={faculties}
              multiline
              rows="3"
              fullWidth
              variant="outlined"
              className={classes.disc_field}
            />
            <TextField
              onChange={handleChange("trainingFields")}
              id="outlined-basic"
              label="Training Fields..."
              value={trainingFields}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("general")}
              id="outlined-basic"
              label="General..."
              value={general}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("duration")}
              id="outlined-basic"
              label="Duration..."
              value={duration}
              variant="outlined"
              className={classes.text_field}
            />

            <DialogActions>
              <Button
                className={classes.add_university_button}
                color="primary"
                variant="contained"
                onClick={university.id ? onUpdate : onSubmit}
                endIcon={<AddIcon />}
              >
                {university.id ? "Update" : "Add"}
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

export default University;
