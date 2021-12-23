import React, { useState, useEffect } from "react";
import { isAutheticated } from "../../auth";
import { getContact, getContacts, deleteContact } from "./contactApiCall";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
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
    minWidth: 500,
    marginRight: 5,
  },
});

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const { token, id } = isAutheticated();
  // console.log(contacts);

  const preload = () => {
    getContacts(id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // console.log(data);
        setContacts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteContactById = (contactUsId) => {
    deleteContact(contactUsId, id, token).then((data) => {
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
      <h2 style={{ paddingBottom: "1rem", marginTop: "-2rem" }}>Contact</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Number</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Mobile</StyledTableCell>
              <StyledTableCell>Message</StyledTableCell>
              <StyledTableCell>Created Time</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{contact.name}</StyledTableCell>
                <StyledTableCell>{contact.email}</StyledTableCell>
                <StyledTableCell>{contact.mobile}</StyledTableCell>
                <StyledTableCell>{contact.message}</StyledTableCell>
                <StyledTableCell>
                  {formatDate(contact.createdAt)}
                </StyledTableCell>
                <StyledTableCell>
                  <button
                    onClick={() => {
                      return deleteContactById(contact.id);
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

export default Contact;
