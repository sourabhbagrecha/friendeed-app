import React from "react";
import "./AvailableHelpers.css";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CenterFocusStrong } from "@material-ui/icons";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
  
    },
    media: {
      height: 70,
    },
    inline: {
        display: 'inline',
      },
  }));


function AvailableHelpers(props) {

    const classes = useStyles();


    return(
    <div>
    <div className="page-heading">
        <h1>Available Helpers</h1>
    </div>    
    <div className="card">
        <Card>
        <CardActionArea>
            <CardContent>
            <Typography gutterBottom variant="subtitle2" component="h4" align="left">
                Helpers who've accepted.
            </Typography>

            <div className="text">
            <List className={classes.root}>
                <ListItem button>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                    primary="Rashida Jones"
                    secondary={
                        <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            Helped - 3, Requested - 4, Level - 2
                        </Typography>
                        {" — 3 Kms Away!"}
                        </React.Fragment>
                    }
                    />
                </ListItem>
                </ListItem>
                <Divider variant="inset" component="li" />
                
                <ListItem button>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                    <Avatar alt="Travis Howard" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                    primary="Travis Howard"
                    secondary={
                        <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            Helped - 5, Requested - 2, Level - 2
                        </Typography>
                        {" — 3.7 Kms Away!"}
                        </React.Fragment>
                    }
                    />
                </ListItem>
                </ListItem>
                <Divider variant="inset" component="li" />

                <ListItem button>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                    primary="Cindy Baker"
                    secondary={
                        <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            Helped - 12, Requested - 4, Level - 4
                        </Typography>
                        {" — 4.8 Kms Away!"}
                        </React.Fragment>
                    }
                    />
                </ListItem>
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>
             
               
            </div>
            </CardContent>
        </CardActionArea>
        </Card>


    </div>
    </div>   
      );
}

export default AvailableHelpers;



