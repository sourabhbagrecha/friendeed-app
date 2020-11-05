import React from 'react';
import { gql, useQuery, useSubscription } from '@apollo/client'
import { Avatar, Card, CardContent, Divider, makeStyles, Typography } from '@material-ui/core'
import { Link, useRouteMatch } from 'react-router-dom';
import Loading from '../../components/Loading.component';
import "./ShowHelpOffer.css";

const GET_HELP = gql`
  subscription GetHelpRequest($id: ID!) {
    getHelpRequest(id: $id) {
      title
      description
      id
      fromUser{
        name
        id
        picture
      }
      conversation{
        text
        id
        fromUser{
          name
          id
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


function ShowHelpOffer() {
  console.log("Mountin")
  const match = useRouteMatch();
  const { helpOfferId, helpId } = match.params;

  const onSubscriptionData = (subsData) => {
    console.log("This is the subsData", subsData)
  }

  const { loading, error, data } = useSubscription(GET_HELP, {
    variables: {
      id: helpOfferId
    },
    onSubscriptionData 
  });

  if (loading) return <Loading />
  if (error) return <p>{error.message}</p>

  if (!data.getHelpRequest) return "Not found"

  const { getHelpRequest: { title, description, fromUser, conversation } } = data

  return (
    <div className="ShowHelpOffer">
      <div className="title-block">
        <Typography variant="h4" color="primary" className="page-heading">{title}</Typography>
      </div>
      <div className="userInfo">
        <Avatar style={{ height: "1.5rem", width: "1.5rem" }} className="userAvatar" src={fromUser.picture} />
        <Typography variant="body1">{fromUser.name}</Typography>
      </div>
      <div className="description-block">
        <Typography className="description" style={{ fontSize: "20px" }}><strong>Description:</strong> {description} </Typography>
      </div>
      {/* <Button color="primary" variant="contained" onClick={() => history.push(`/help/${helpId}/help-offer`)}>Offer Help</Button> */}
      <div className="help-requests-block">
        {
          conversation.length > 0 ?
            <Typography variant="h4" color="primary">Conversation: {conversation.length}</Typography> :
            <Typography variant="h6" color="error">No messages here, start a conversation now!</Typography>
        }
        {
          conversation.map(message =>
            <Card elevation={5} className="requestCard">
              <CardContent>
                <Typography variant="body1">{message.text}</Typography>
                <Link to={`/user/${message.fromUser.id}`} style={{ textDecoration: "none" }}>
                  <div className="userInfo">
                    <Avatar style={{ height: "1.5rem", width: "1.5rem" }} className="userAvatar" src={message.fromUser.picture} />
                    <Typography variant="body1" color="textSecondary">{message.fromUser.name}</Typography>
                  </div>
                </Link>
              </CardContent>
            </Card>
          )
        }
      </div>
    </div>
  )
}

export default ShowHelpOffer
