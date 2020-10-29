import React from "react";
import "./Login.css";
import { Button, TextField } from "@material-ui/core";

function Login(props) {
  return (
    <div className="Login">
      <h1 className="page-heading">Login</h1>
      {/* <div className="input">
        <TextField label="Email" variant="outlined" fullWidth />
      </div>
      <div className="input">
        <TextField label="Password" variant="outlined" fullWidth />
      </div>
      <div className="submit">
        <Button variant="contained" color="primary">Submit</Button>
      </div> */}
      <img SRC="/Users/Akash/Desktop/friendeed-app/src/pages/Login/insta.jpg" alt="insta" width="10" height="10"/>

    </div>
  );
}

export default Login;
