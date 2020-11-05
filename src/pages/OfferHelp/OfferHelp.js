import { gql, useMutation } from '@apollo/client'
import { Button, TextField, Typography } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
// import Loading from '../../components/Loading.component'
import { AlertContext } from '../../contexts/Alert.context'
import { UserContext } from '../../contexts/User.context'
import './OfferHelp.css'

const ADD_HELP_REQUEST = gql`
mutation AddHelpRequest($title: String!, $description: String!, $helpId: ID!, $userEmail: String!) {
	addHelpRequest(input: [{title: $title, description: $description, help: {id: $helpId}, fromUser: {email: $userEmail}}]){
    helpRequest{
      id
      title
      description
      fromUser{
        id
      }
      help{
        id
      }
    }
  }
}
`;

// const GET_HELP = gql`
//   query GetHelp($id: ID!) {
//     getHelp(id: $id) {
//       title
//       skillsRequired
//       fromUser{
//         email
//         id
//       }
//     }
//   }
// `;

function OfferHelp() {
  const { state: { user } } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext)
  const match = useRouteMatch();
  const history = useHistory();
  const {helpId} = match.params;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  // const {loading, error, data} = useQuery(GET_HELP, {
  //   variables: {
  //     id: helpId
  //   }
  // })

  const onError = (error) => {
    console.log({ error })
  }

  const onCompleted = (data) => {
    setAlert(true, "Help Request sent successfully")
    history.push(`/help/${helpId}`)
  }

  const [addHelpRequestSubmit] = useMutation(ADD_HELP_REQUEST, { onError, onCompleted })

  // if (loading) return <Loading/>
  // if (error) return <p>{error.message}</p>

  // const {getHelp} = data; //We will use it later to populate the offer help page

  const onSubmit = (e) => {
    e.preventDefault()
    if (!title || !description || !user) {
      return
    }

    addHelpRequestSubmit({
      variables: {
        title,
        description,
        userEmail: user.email,
        helpId
      }
    })
  }

  return (
    <div className="OfferHelp">
      <Typography className="page-heading" variant="h2" color="primary">Offer help</Typography>
      <div className="form-element">
        <TextField value={title} onChange={e => setTitle(e.target.value)} variant="outlined" label="Title" fullWidth />
      </div>
      <div className="form-element">
        <TextField value={description} onChange={e => setDescription(e.target.value)} variant="outlined" multiline rows={4} label="Description" fullWidth />
      </div>
      <div className="form-element submit">
        <Button variant="contained" color="secondary" onClick={onSubmit}>Submit</Button>
      </div>
    </div>
  )
}

export default OfferHelp
