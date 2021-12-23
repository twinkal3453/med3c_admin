import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Redirect } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./login.css";

import { signin, authenticate, isAutheticated } from "../../auth/index";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  inputField: {
    width: "50vw",
    margin: theme.spacing(1),
  },
  buttonSubmit: {
    width: "50vw",
    height: "3rem",
  },
}));
const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
    error: false,
    didRedirect: false,
  });
  const classes = useStyles();

  const { email, password, loading, error, didRedirect } = values;
  const user = isAutheticated();
  // console.log(user);
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    // console.log(email, password);
    signin({ email, password }).then((data) => {
      // console.log(data.name);
      if (data.error) {
        setValues({ ...values, error: true, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            didRedirect: true,
          });
        });
      }
    });
    // .catch(console.log("signin request failed"));
  };

  const performRedirect = () => {
    // console.log("welcome to admin page");
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/" />;
      } else {
        return <Redirect to="/login" />;
      }
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
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

  const LoginForm = () => {
    return (
      <div className="loginMain">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            onChange={handleChange("email")}
            value={email}
            label="eg admin@med3c.com"
            variant="outlined"
            className={classes.inputField}
          />
          <TextField
            id="outlined-basic"
            onChange={handleChange("password")}
            value={password}
            label="Password..."
            variant="outlined"
            className={classes.inputField}
          />
          <Button
            onClick={onSubmit}
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            disableElevation
          >
            Submit
          </Button>
        </form>
      </div>
    );
  };

  return (
    <div>
      {loadingMessage()}
      {errorMessage()}
      {LoginForm()}
      {performRedirect()}
    </div>
  );
};

export default Login;
