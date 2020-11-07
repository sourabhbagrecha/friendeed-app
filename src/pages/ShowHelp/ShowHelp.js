import React from 'react';
import { gql, useSubscription } from '@apollo/client'
import { Button, makeStyles, Paper, Typography } from '@material-ui/core'
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import Loading from '../../components/Loading.component';
import "./ShowHelp.css";
import UserWithTimeAgo from '../../components/UserWithTimeAgo.component';

const GET_HELP = gql`
  subscription GetHelpRequest($id: ID!) {
    getHelpRequest(id: $id) {
      title
      description
      id
      skillsRequired
      createdAt
      fromUser{
        name
        id
        picture
      }
      helpOffers{
        id
        title
        description
        createdAt
        fromUser{
          id
          name
          picture
        }
      }
    }
  }
`;

const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
    textAlign: "left"
  },
  cardText: {
    textAlign: "left"
  }
})

function ShowHelp() {
  const match = useRouteMatch();
  const history = useHistory();
  const { helpRequestId } = match.params;
  const classes = useStyles();

  const { loading, error, data } = useSubscription(GET_HELP, {
    variables: {
      id: helpRequestId
    }
  })

  if (loading) return <Loading />
  if (error) return <p>{error.message}</p>

  if (!data.getHelpRequest) return "Not found"

  const { title, description, skillsRequired, helpOffers, createdAt, fromUser } = data.getHelpRequest

  return (
    <div className="ShowHelp">
      <div className="title-block">
        <Typography variant="h4" color="primary" className="page-heading">{title}</Typography>
      </div>
      <div className="description-block">
        <Typography className="description" style={{ fontSize: "20px" }}><strong>Description:</strong> {description} </Typography>
      </div>
      {
        skillsRequired && <div className="skills-required-block">
          <Typography className="skills-required" style={{ fontSize: "20px" }}><strong>Skills Required:</strong> {skillsRequired}</Typography>
        </div>
      }
      <UserWithTimeAgo createdAt={createdAt} user={fromUser} style={{ marginBottom: "1rem" }} />
      <Button color="primary" variant="contained" onClick={() => history.push(`/help/${helpRequestId}/offer-help`)}>Offer Help</Button>
      <div className="help-requests-block">
        {
          helpOffers.length > 0 ?
            <Typography variant="h4" color="primary">Helps offered:</Typography> :
            <Typography variant="h6" color="error">No helps have been offered yet.</Typography>
        }
        {
          helpOffers.map(helpOffer =>
            <Paper elevation={2} className="requestCard">
              <Link to={`/help/${helpRequestId}/help-offer/${helpOffer.id}`} style={{ textDecoration: "none" }}>
                <Typography className={classes.cardHeading} variant="h5" color="primary"><b>{helpOffer.title}</b></Typography>
              </Link>
              <Typography className={classes.cardHeading} variant="body1">{helpOffer.description}</Typography>
              <UserWithTimeAgo createdAt={helpOffer.createdAt} user={helpOffer.fromUser} style={{ marginBottom: "0.5rem" }} />
            </Paper>
          )
        }
      </div>
    </div>
  )
}

export default ShowHelp
