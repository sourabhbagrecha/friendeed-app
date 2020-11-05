import { gql, useQuery } from '@apollo/client'
import { Avatar, Button, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom';
import Loading from '../../components/Loading.component';
import "./ShowHelp.css"

const GET_HELP = gql`
  query GetHelp($id: ID!) {
    getHelp(id: $id) {
      title
      description
      id
      skillsRequired
      fromUser{
        name
        id
        picture
      }
    }
  }
`;

function ShowHelp() {
  const match = useRouteMatch();
  const history = useHistory();
  const {helpId} = match.params;
  
  const {loading, error, data} = useQuery(GET_HELP, {
    variables: {
      id: helpId
    }
  })

  if(loading) return <Loading/>
  if(error) return <p>{error.message}</p>

  const {getHelp: {title, description, skillsRequired, fromUser}} = data

  return (
    <div className="ShowHelp">
      <div className="title-block">
        <Typography variant="h3" color="primary" className="page-heading">{title}</Typography>
      </div>
      <div className="userInfo">
        <Avatar style={{height: "1.5rem", width: "1.5rem"}} className="userAvatar" src={fromUser.picture} />
        <Typography variant="body1">{fromUser.name}</Typography>
      </div>
      <div className="description-block">
        <Typography className="description" style={{fontSize: "20px"}}><strong>Description:</strong> {description} </Typography>
      </div>
      {
        skillsRequired && <div className="skills-required-block">
          <Typography className="skills-required" style={{fontSize: "20px"}}><strong>Skills Required:</strong> {skillsRequired}</Typography>
        </div>
      }
      <Button color="primary" variant="contained" onClick={() => history.push(`/help/${helpId}/offer-help`)}>Offer Help</Button>
    </div>
  )
}

export default ShowHelp
