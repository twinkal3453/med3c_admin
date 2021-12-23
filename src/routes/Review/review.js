import React, { useState, useEffect } from "react";
import { isAutheticated } from "../../auth";
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from "./reviewApiCalls";
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
import "./review.css";
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
});

const Review = () => {
  const fields = {
    photo: "",
    name: "",
    address: "",
    content: "",
    loading: false,
    error: false,
  };
  const [reviews, setReviews] = useState([]);
  const [nameError, setNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const { token, id } = isAutheticated();
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState(fields);
  const { photo, name, address, content, loading, error } = review;

  // for opening dilog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setReview(fields);
  };
  // close dilog box

  const preload = () => {
    getReviews().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setReviews(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

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

  const onSubmit = (event) => {
    event.preventDefault();
    setNameError(false);
    setAddressError(false);
    setContentError(false);

    if (name === "") {
      setNameError(true);
    }
    if (address === "") {
      setAddressError(true);
    }
    if (content === "") {
      setContentError(true);
    }

    if (name && address && content) {
      setReview({ ...review, loading: true });
      createReview(id, token, review)
        .then((data) => {
          // console.log(data);
          setReview(fields);
          preload();
          handleClose();
        })
        .catch((err) => {
          setReview({ ...review, error: true });
        });
    }
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setReview({ ...review, [name]: value });
  };

  const deleteReviewById = (reviewId) => {
    deleteReview(reviewId, id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  const onEdit = (reviewId) => {
    const index = reviews.findIndex((r, i) => r.id === reviewId);
    setReview(reviews[index]);
    handleClickOpen();
  };

  const onUpdate = (event) => {
    event.preventDefault();
    setNameError(false);
    setAddressError(false);
    setContentError(false);

    if (name === "") {
      setNameError(true);
    }
    if (address === "") {
      setAddressError(true);
    }
    if (content === "") {
      setContentError(true);
    }
    if (name && address && content) {
      setReview({ ...review, loading: true });
      updateReview(review.id, id, token, review)
        .then((data) => {
          // console.log(data);
          preload();
          handleClose();
        })
        .catch((err) => {
          setReview({ ...review, error: true });
        });
    }
  };

  const classes = useStyles();

  const formDialog = () => (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        {review.id ? "Update review" : "Add review"}
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
          <TextField
            onChange={handleChange("name")}
            id="outlined-basic"
            required
            error={nameError}
            label="Name..."
            variant="outlined"
            value={name}
            className={classes.text_field}
          />
          <TextField
            onChange={handleChange("address")}
            id="outlined-basic"
            label="Address..."
            required
            error={addressError}
            value={address}
            variant="outlined"
            className={classes.text_field}
          />
          <TextField
            onChange={handleChange("content")}
            id="outlined-basic"
            label="Content..."
            required
            error={contentError}
            value={content}
            multiline
            rows="3"
            fullWidth
            variant="outlined"
            className={classes.disc_field}
          />

          <DialogActions>
            <Button
              className="submit_Button"
              color="primary"
              variant="contained"
              onClick={review.id ? onUpdate : onSubmit}
              endIcon={<AddIcon />}
            >
              {review.id ? "Update" : "Add"}
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
  );

  return (
    <div className="mainTable">
      <h2 style={{ paddingBottom: "1rem", marginTop: "-2rem" }}>Review</h2>
      {formDialog()}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Photo</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Content</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>U / D</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>
                  <img height="100px" src={`${PATH}/${review.photo}`} alt="" />
                </StyledTableCell>
                <StyledTableCell>{review.name}</StyledTableCell>
                <StyledTableCell>{review.address}</StyledTableCell>
                <StyledTableCell>{review.content}</StyledTableCell>
                <StyledTableCell>
                  {formatDate(review.createdAt)}
                </StyledTableCell>
                <StyledTableCell>
                  <button
                    onClick={() => {
                      onEdit(review.id);
                    }}
                    className="buttonUpdate"
                  >
                    <CreateIcon className="iconForDelete" />
                  </button>
                  <button
                    className="buttonDelete"
                    onClick={() => {
                      deleteReviewById(review.id);
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
      <Fab onClick={handleClickOpen} id="AddReview" variant="extended">
        Add Review
      </Fab>
    </div>
  );
};

export default Review;
