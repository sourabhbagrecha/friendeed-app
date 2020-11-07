import React, { useContext, useState } from 'react';
import { gql, useMutation, useSubscription } from '@apollo/client'
import { Button, Paper, TextField, Typography } from '@material-ui/core'
import { useRouteMatch } from 'react-router-dom';
import Loading from '../../components/Loading.component';
import "./ShowHelpOffer.css";
import { formatRFC3339 } from 'date-fns';
import { UserContext } from '../../contexts/User.context';
import UserWithTimeAgo from '../../components/UserWithTimeAgo.component';
import { AlertContext } from '../../contexts/Alert.context';

const GET_HELP = gql`
  subscription GetHelpOffer($id: ID!) {
    getHelpOffer(id: $id) {
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
mutation AddMessage($text: String!, $userEmail: String!, $createdAt: DateTime!, $helpOffer: ID!){
  addMessage(input: [{text: $text, fromUser: {email: $userEmail}, helpOffer: {id: $helpOffer}, createdAt: $createdAt}]){
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
  const { setAlert } = useContext(AlertContext);
  const { helpOfferId } = match.params;
  const [message, setMessage] = useState("");

  const { loading, error, data } = useSubscription(GET_HELP, {
    variables: {
      id: helpOfferId
    }
  });

  const onError = (err) => { setAlert(true, "Something went wrong!", "error") }

  const [addMessage] = useMutation(ADD_MESSAGE, { onError })

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
        helpOffer: helpOfferId,
      }
    })
    setMessage("")
  }

  if (!data.getHelpOffer) return "Not found"

  const { getHelpOffer: { title, description, fromUser, conversation, createdAt } } = data


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
            <Typography variant="h6" color="error" style={{marginBottom: "1rem"}}>No messages, start a conversation now!</Typography>
        }
        {
          conversation.map(message =>
            <Paper elevation={3} className="requestCard">
              <Typography variant="body1">{message.text}</Typography>
              <UserWithTimeAgo createdAt={message.createdAt} user={message.fromUser}/>
            </Paper>
          )
        }
        <TextField label="message" value={message} onChange={e => setMessage(e.target.value)} variant="outlined" fullWidth />
        <Button style={{marginTop: "1rem"}} variant="contained" color="secondary" onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  )
}

export default ShowHelpOffer
