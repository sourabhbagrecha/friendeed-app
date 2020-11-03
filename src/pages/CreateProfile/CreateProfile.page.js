import React from "react";
import "./CreateProfile.css";
import Avatar from '@material-ui/core/Avatar';
import { Button, TextField } from "@material-ui/core";
import { Facebook, Instagram, LinkedIn }  from '@material-ui/icons';

function CreateProfile(props) {
  return(
    <div className="Profile">
      <h1 className="page-heading">Create your profile</h1>
      
      <div className = "picture">
        <Avatar src="/broken-image.jpg" />
        {/* <Avatar alt="Remy Sharp" src="/broken-image.jpg" className={classes.orange} /> */}
      </div>

      <div className="uploadPic">
        <Button color = "secondary">Upload Picture</Button>
      </div>    

      <div className="text">
        <TextField label="Description" multiline rows = {4} variant="filled" fullWidth />
      </div>

      <div className="text">
        <TextField label="Contact No." variant="filled" fullWidth />
      </div>

      <div className="text">
        <TextField label="Help Preferences" multiline rows = {3} variant="filled" fullWidth />
      </div>

      <div className="linkAcc">
        <p>Link your social media profile</p>
      </div>

      <Facebook className="social-icon" color="secondary" style={{fontSize: "80px"}}/>
      <LinkedIn className="social-icon" color="secondary" style={{fontSize: "80px"}}/>
      <Instagram className="social-icon" color="secondary" style={{fontSize: "80px"}}/>
    </div>
  );
}

export default CreateProfile;