import React, { useState, useEffect } from "react";
import { isAutheticated } from "../../auth";
import {
  getCountry,
  getCountrys,
  deleteCountry,
  updateCountry,
  createCountry,
} from "./countryApiCall";
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
import { PATH } from "../../backend";
import "./country.css";
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
  add_country_button: {
    marginTop: "1ch",
    width: "20ch",
  },
});

const Country = () => {
  // console.log(PATH);
  const fields = {
    picture: "",
    name: "",
    description: "",
    capital: "",
    currency: "",
    countryCode: "",
    timeZone: "",
    religion: "",
    language: "",
    living: "",
    firstYearPackage: "",
    documents: "",
    eligibility: "",
    duration: "",
    intake: "",
    holydays: "",
    ourServices: "",
    memberOf: "",
    whyStudy: "",
    loading: false,
    error: false,
  };
  const [countrys, setCountrys] = useState([]);
  const { token, id } = isAutheticated();
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState(fields);

  const {
    picture,
    name,
    description,
    capital,
    currency,
    countryCode,
    timeZone,
    religion,
    language,
    living,
    firstYearPackage,
    documents,
    eligibility,
    duration,
    intake,
    holydays,
    ourServices,
    memberOf,
    whyStudy,
    loading,
    error,
  } = country;

  // for opening dilog
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setCountry(fields);
  };
  // close dilog box

  // Get all countries
  const preload = () => {
    getCountrys().then((data) => {
      if (data.error) {
        setCountrys({ error: data.error });
      } else {
        setCountrys(data);
      }
    });
  };

  useEffect(() => {
    preload();
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
      setCountry({ ...country, loading: true });
      createCountry(id, token, country)
        .then((data) => {
          // console.log(data);
          setCountry({
            ...country,
            picture: "",
            name: "",
            description: "",
            capital: "",
            currency: "",
            countryCode: "",
            timeZone: "",
            religion: "",
            language: "",
            living: "",
            firstYearPackage: "",
            documents: "",
            eligibility: "",
            duration: "",
            intake: "",
            holydays: "",
            ourServices: "",
            memberOf: "",
            whyStudy: "",
          });
          preload();
          handleClose();
        })
        .catch((err) => {
          setCountry({ ...country, error: true });
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
    setCountry({ ...country, [name]: value });
  };

  const deleteCountryById = (countryId) => {
    deleteCountry(countryId, id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  const onEdit = (countryId) => {
    const index = countrys.findIndex((c, i) => c.id === countryId);
    setCountry(countrys[index]);
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
      setCountry({ ...country, loading: true });
      updateCountry(country.id, id, token, country)
        .then((data) => {
          console.log(data);
          preload();
          handleClose();
        })
        .catch((err) => {
          setCountry({ ...country, error: true });
        });
    }
  };

  const classes = useStyles();

  return (
    <div className="mainTable">
      <h2 style={{ paddingBottom: "1rem", marginTop: "-2rem" }}>Country</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Picture</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Capital</StyledTableCell>
              <StyledTableCell>Currency</StyledTableCell>
              <StyledTableCell>Language</StyledTableCell>
              <StyledTableCell>Living</StyledTableCell>
              <StyledTableCell>Time</StyledTableCell>
              <StyledTableCell>U / D</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countrys.map((country, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>
                  <img
                    height="80px"
                    src={`${PATH}/${country.picture}`}
                    alt=""
                  />
                </StyledTableCell>
                <StyledTableCell>{country.name}</StyledTableCell>
                <StyledTableCell>{country.capital}</StyledTableCell>
                <StyledTableCell>{country.currency}</StyledTableCell>
                <StyledTableCell>{country.religion}</StyledTableCell>
                <StyledTableCell>{country.language}</StyledTableCell>
                <StyledTableCell>
                  {formatDate(country.createdAt)}
                </StyledTableCell>
                <StyledTableCell>
                  <button
                    className="buttonUpdate"
                    onClick={() => {
                      onEdit(country.id);
                    }}
                  >
                    <CreateIcon className="iconForDelete" />
                  </button>
                  <button
                    className="buttonDelete"
                    onClick={() => {
                      return deleteCountryById(country.id);
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
        id="Add_Country"
        onClick={handleClickOpen}
        variant="extended"
        color="primary"
      >
        Add Country
      </Fab>

      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {country.id ? "Update Country" : "Add Country"}
          {loadingMessage()}
          {errorMessage()}
        </DialogTitle>
        <DialogContent className="main_input_field">
          <form>
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
              label="Country Name..."
              required
              error={nameError}
              value={name}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("capital")}
              id="outlined-basic"
              label="Capital..."
              value={capital}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("description")}
              id="outlined-basic"
              label="Description..."
              value={description}
              error={descriptionError}
              required
              multiline
              rows="3"
              fullWidth
              variant="outlined"
              className={classes.disc_field}
            />
            <TextField
              onChange={handleChange("currency")}
              id="outlined-basic"
              label="Currency..."
              value={currency}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("countryCode")}
              id="outlined-basic"
              label="Country Code..."
              value={countryCode}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("timeZone")}
              id="outlined-basic"
              label="Time Zone..."
              value={timeZone}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("religion")}
              id="outlined-basic"
              label="Relgion..."
              value={religion}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("language")}
              id="outlined-basic"
              label="Language..."
              value={language}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("living")}
              id="outlined-basic"
              label="Living..."
              value={living}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("eligibility")}
              id="outlined-basic"
              label="Eligibility..."
              value={eligibility}
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
            <TextField
              onChange={handleChange("firstYearPackage")}
              id="outlined-basic"
              label="First Year Package..."
              value={firstYearPackage}
              fullWidth
              multiline
              variant="outlined"
              className={classes.disc_field}
            />
            <TextField
              onChange={handleChange("documents")}
              id="outlined-basic"
              label="Documents..."
              value={documents}
              fullWidth
              multiline
              rows="6"
              variant="outlined"
              className={classes.disc_field}
            />
            <TextField
              onChange={handleChange("ourServices")}
              id="outlined-basic"
              label="Our Services..."
              value={ourServices}
              fullWidth
              multiline
              variant="outlined"
              className={classes.disc_field}
            />
            <TextField
              onChange={handleChange("memberOf")}
              id="outlined-basic"
              label="Member of..."
              value={memberOf}
              fullWidth
              multiline
              variant="outlined"
              className={classes.disc_field}
            />
            <TextField
              onChange={handleChange("intake")}
              id="outlined-basic"
              label="Intake..."
              value={intake}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("holydays")}
              id="outlined-basic"
              label="Holydays..."
              value={holydays}
              variant="outlined"
              className={classes.text_field}
            />
            <TextField
              onChange={handleChange("whyStudy")}
              id="outlined-basic"
              label="Why Study..."
              value={whyStudy}
              fullWidth
              multiline
              rows="3"
              variant="outlined"
              className={classes.disc_field}
            />

            <DialogActions>
              <Button
                className={classes.add_country_button}
                color="primary"
                variant="contained"
                onClick={country.id ? onUpdate : onSubmit}
                endIcon={<AddIcon />}
              >
                {country.id ? "Update" : "Add"}
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

export default Country;
