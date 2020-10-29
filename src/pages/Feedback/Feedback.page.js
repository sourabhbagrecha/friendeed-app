import React from "react";
import "./Feedback.css";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CenterFocusStrong } from "@material-ui/icons";



const useStyles = makeStyles({
    root: {
      maxWidth: 450,
      maxHeight: 500,
      paddingTop: "3rem"
    },
    media: {
      height: 70,
    },
  });


function Feedback(props) {

    const classes = useStyles();


    return(
    <div>
    <div className="page-heading">
        <h1>Feedback</h1>
    </div>    
    <div className="card">
        <Card>
        <CardActionArea>
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2" align="center">
                Rate your helper!
            </Typography>
            <div className="text">
                <TextField label="Please Provide Fedback" multiline rows = {3} variant="filled" fullWidth />
            </div>
            </CardContent>
        </CardActionArea>
        {/* <CardActions> */}
            <div className="button">
                <Button variant = "contained" color="secondary">Submit</Button>
            </div>
            <div className="button">
                <Button color="secondary">Report User</Button>
            </div>
        {/* </CardActions> */}
        </Card>


    </div>
    </div>   
      );
}

export default Feedback;



