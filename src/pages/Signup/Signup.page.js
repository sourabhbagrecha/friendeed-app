import React from "react";
import "./Signup.css";
import { Button, TextField } from "@material-ui/core";

function Signup(props) {
  return (
    <div className="Signup">
      <h1 className="page-heading">Signup</h1>
      <div className="input">
        <TextField label="Email" variant="outlined" fullWidth />
      </div>
      <div className="input">
        <TextField label="Password" variant="outlined" fullWidth />
      </div>
      <div className="submit">
        <Button variant="contained" color="primary">Submit</Button>
      </div>
    </div>
  );
}

export default Signup;
