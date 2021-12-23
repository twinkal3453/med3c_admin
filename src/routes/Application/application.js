import React, { useState, useEffect } from "react";
import { isAutheticated } from "../../auth";
import {
  getApplication,
  getApplications,
  deleteApplication,
} from "./applicationApiCalls";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import "./application.css";
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

const useStyles = makeStyles({});

const Application = () => {
  const [applications, setApplications] = useState([]);
  const { token, id } = isAutheticated();

  const preload = () => {
    getApplications(id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setApplications(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteApplicationById = (applicationId) => {
    deleteApplication(applicationId, id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  const classes = useStyles();

  return (
    <div className="mainTable">
      <h2 style={{ paddingBottom: "1rem", marginTop: "-2rem" }}>Application</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Passport No</StyledTableCell>
              <StyledTableCell>University Apply for</StyledTableCell>
              <StyledTableCell>Course Apply for</StyledTableCell>
              <StyledTableCell>Contact</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Time</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((application, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{application.name}</StyledTableCell>
                <StyledTableCell>{application.passportNo}</StyledTableCell>
                <StyledTableCell>
                  {application.universityApplyFor}
                </StyledTableCell>
                <StyledTableCell>{application.courseApplyFor}</StyledTableCell>
                <StyledTableCell>{application.contact}</StyledTableCell>
                <StyledTableCell>{application.email}</StyledTableCell>
                <StyledTableCell>
                  {formatDate(application.createdAt)}
                </StyledTableCell>
                <StyledTableCell>
                  <button
                    onClick={() => {
                      return deleteApplicationById(application.id);
                    }}
                    className="buttonDelete"
                  >
                    <DeleteIcon className="iconForDelete" />
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default Application;
