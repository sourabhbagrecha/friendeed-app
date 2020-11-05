import React, { useContext, useState } from 'react';
import { gql, useMutation, useSubscription } from '@apollo/client'
import { Button, Card, CardContent, TextField, Typography } from '@material-ui/core'
import { useRouteMatch } from 'react-router-dom';
import Loading from '../../components/Loading.component';
import "./ShowHelpOffer.css";
import { formatRFC3339 } from 'date-fns';
import { UserContext } from '../../contexts/User.context';
import UserWithTimeAgo from '../../components/UserWithTimeAgo.component';

const GET_HELP = gql`
  subscription GetHelpRequest($id: ID!) {
    getHelpRequest(id: $id) {
      title
      description
      id
      createdAt
      fromUser{
        name
        id
        picture
      }
      conversation{
        text
        id
        createdAt
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
  if (error) return <p>Something went wrong</p>

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
    setMessage("")
  }

  if (!data.getHelpRequest) return "Not found"

  const { getHelpRequest: { title, description, fromUser, conversation, createdAt } } = data


  return (
    <div className="ShowHelpOffer">
      <div className="title-block">
        <Typography variant="h4" color="primary" className="page-heading">{title}</Typography>
      </div>
      <UserWithTimeAgo createdAt={createdAt} user={fromUser}/>
      <div className="description-block">
        <Typography className="description" style={{ fontSize: "20px" }}><strong>Description:</strong> {description} </Typography>
      </div>
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
                <UserWithTimeAgo createdAt={message.createdAt} user={message.fromUser}/>
              </CardContent>
            </Card>
          )
        }
        <TextField label="message" value={message} onChange={e => setMessage(e.target.value)} variant="outlined" fullWidth />
        <Button style={{marginTop: "1rem"}} variant="contained" color="secondary" onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  )
}

export default ShowHelpOffer
