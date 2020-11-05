import React from 'react';
import { gql, useSubscription } from '@apollo/client'
import { Button, Card, CardContent, Divider, makeStyles, Typography } from '@material-ui/core'
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import Loading from '../../components/Loading.component';
import "./ShowHelp.css";
import UserWithTimeAgo from '../../components/UserWithTimeAgo.component';

const GET_HELP = gql`
  subscription GetHelp($id: ID!) {
    getHelp(id: $id) {
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
      requests{
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
  const { helpId } = match.params;
  const classes = useStyles();

  const { loading, error, data } = useSubscription(GET_HELP, {
    variables: {
      id: helpId
    }
  })

  if (loading) return <Loading />
  if (error) return <p>{error.message}</p>

  if (!data.getHelp) return "Not found"

  const { getHelp: { title, description, skillsRequired, requests, createdAt, fromUser } } = data

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
      <UserWithTimeAgo createdAt={createdAt} user={fromUser} style={{marginBottom: "1rem"}}/>
      <Button color="primary" variant="contained" onClick={() => history.push(`/help/${helpId}/offer-help`)}>Offer Help</Button>
      <div className="help-requests-block">
        {
          requests.length > 0 ?
            <Typography variant="h4" color="primary">Helps offered:</Typography> :
            <Typography variant="h6" color="error">No helps have been offered yet.</Typography>
        }
        {
          requests.map(request =>
            <Card elevation={5} className="requestCard">
              <CardContent>
                <Link to={`/help/${helpId}/help-offer/${request.id}`} style={{ textDecoration: "none" }}>
                  <Typography className={classes.cardHeading} variant="h5" color="primary"><b>{request.title}</b></Typography>
                </Link>
                <Divider />
                <Typography className={classes.cardHeading} variant="body1">{request.description}</Typography>
                <UserWithTimeAgo createdAt={request.createdAt} user={request.fromUser} style={{marginBottom: "0.5rem"}}/>
              </CardContent>
            </Card>
          )
        }
      </div>
    </div>
  )
}

export default ShowHelp
