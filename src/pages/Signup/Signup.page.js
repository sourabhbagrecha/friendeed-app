import React from "react";
import "./Signup.css";
import { Button, TextField } from "@material-ui/core";

function Signup(props) {

  return (
    <div className="Signup">
      <h1 className="page-heading">Sign Up</h1>
      
      <div className="input">
        <TextField required label="Name" variant="outlined" color="secondary" fullWidth />
      </div>
      
      <div className="input">
        <TextField required label="Email" variant="outlined" color="secondary" fullWidth />
      </div>
      
      <div className="input">
        <TextField required label="Password" variant="outlined" color="secondary" type = "password" fullWidth />
      </div>    

      <div className="submit">
        <Button variant="contained" color="secondary">Sign Up</Button>
      </div>

      <div className="accountExists">
        <Button color = "secondary">Already have an account? Login.</Button>
      </div>

    </div>
  );
}

export default Signup;
