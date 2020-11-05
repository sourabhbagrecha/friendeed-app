import React from "react";
import "./Signup.css";
import { Button } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";

function Signup(props) {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="Signup">
      <h1 className="page-heading">
        Authenticate Yourself
        <span role="img" aria-label="slightly-smiling">
          🙂
        </span>
      </h1>
      <div className="submit">
        <Button variant="contained" color="secondary" onClick={loginWithRedirect}>
          Sign Up/Login
        </Button>
      </div>
    </div>
  );
}

export default Signup;
