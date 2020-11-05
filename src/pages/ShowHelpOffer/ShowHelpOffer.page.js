import React, { useContext, useState } from 'react';
import { gql, useMutation, useSubscription } from '@apollo/client'
import { Avatar, Button, Card, CardContent, TextField, Typography } from '@material-ui/core'
import { Link, useRouteMatch } from 'react-router-dom';
import Loading from '../../components/Loading.component';
import "./ShowHelpOffer.css";
import { formatRFC3339 } from 'date-fns';
import { UserContext } from '../../contexts/User.context';

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

const ADD_MESSAGE = gql`
mutation AddMessage($text: String!, $userEmail: String!, $createdAt: DateTime!, $helpRequest: ID!){
  addMessage(input: [{text: $text, fromUser: {email: $userEmail}, helpRequest: {id: $helpRequest}, createdAt: $createdAt}]){
    message{
      text
      id
    }
    numUids
  }
}
`;

function ShowHelpOffer() {
  const match = useRouteMatch();
  const { state: { user } } = useContext(UserContext);
  const { helpOfferId } = match.params;
  const [message, setMessage] = useState("");

  const { loading, error, data } = useSubscription(GET_HELP, {
    variables: {
      id: helpOfferId
    }
  });

  const onError = (err) => { console.log(err) }
  const onCompleted = (data) => { console.log(data) }

  const [addMessage] = useMutation(ADD_MESSAGE, { onError, onCompleted })

  if (loading) return <Loading />
  if (error) return <p>{error.message}</p>

  const handleSendMessage = () => {
    if (!message) {
      return
    }
    addMessage({
      variables: {
        text: message,
        userEmail: user.email,
        createdAt: formatRFC3339(Date.now()),
        helpRequest: helpOfferId,
      }
    })
  }

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
            <Typography variant="h5" color="primary">Conversation: {conversation.length}</Typography> :
            <Typography variant="h6" color="error">No messages, start a conversation now!</Typography>
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
        <TextField label="message" value={message} onChange={e => setMessage(e.target.value)} variant="outlined" fullWidth style={{ margin: "2rem 0 0 0" }} />
        <Button variant="contained" color="secondary" onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  )
}

export default ShowHelpOffer
