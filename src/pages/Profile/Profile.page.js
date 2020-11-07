import React from 'react';
import { Divider, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../../components/Loading.component';
import { Link, useRouteMatch } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { formatDistanceToNow } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  profile: {
    textAlign: 'center',
  },
  profileImg: {
    borderRadius: '50%',
    height: '200px',
    marginTop: '2rem'
  },
  logout: {
    textAlign: 'center',
  },
  admin: {
    textAlign: 'center',
    marginTop: '10px',
  },
  nameBlock: {
    margin: '2rem 0',
  },
  card: {
    textAlign: "left",
    margin: "1rem 0",
    padding: "1rem"
  }
}));

const GET_USER = gql`
  query GetUserProfile($id: ID!){
    getUser(id: $id){
      name
      picture
      helpRequests {
        id
        title
        description
        createdAt
      }
      helpOffers {
        title
        id
        description
        createdAt
        helpRequest {
          id
        }
      }
    }
  }
`;

const Profile = () => {
  const classes = useStyles();
  const { params } = useRouteMatch();
  const { userId } = params;

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      id: userId
    }
  });

  if (loading) return <Loading />
  if (error) return <p>Not Found!</p>

  return (
    <>
      <div className={classes.profile}>
        <img
          className={`${classes.profileImg}`}
          src={data.getUser.picture}
          alt="Profile"
        />
        <div>
          <Typography variant="h5" color="primary" className={classes.nameBlock}>{data.getUser.name}</Typography>
        </div>
        <Divider />
        <div>
          {
            data.getUser.helpOffers.length > 0 ?
              <>
                <Typography variant="h5" color="primary" >Recent helps offered: </Typography>
                {
                  data.getUser.helpOffers.map(helpOffer =>
                    <Paper className={classes.card} elevation={2} >
                      <Link to={`/help/${helpOffer.helpRequest.id}/help-offer/${helpOffer.id}`} style={{ textDecoration: "none" }}>
                        <Typography variant="h6" color="primary">{helpOffer.title}</Typography>
                      </Link>
                      <Typography variant="body1">{helpOffer.description}</Typography>
                      <Typography variant="caption">{formatDistanceToNow(Date.parse(helpOffer.createdAt))} ago</Typography>
                    </Paper>
                  )
                }
              </>
              :
              null
          }
        </div>
        <div>
          {
            data.getUser.helpRequests.length > 0 ?
              <>
                <Typography variant="h5" color="primary" >Recent helps requested: </Typography>
                {
                  data.getUser.helpRequests.map(helpRequest =>
                    <Paper className={classes.card} elevation={2} >
                      <Link to={`/help/${helpRequest.id}`} style={{ textDecoration: "none" }}>
                        <Typography variant="h6" color="primary"><b>{helpRequest.title}</b></Typography>
                      </Link>
                      <Typography variant="body1">{helpRequest.description}</Typography>
                      <Typography variant="caption">{formatDistanceToNow(Date.parse(helpRequest.createdAt))} ago</Typography>
                    </Paper>
                  )
                }
              </>
              :
              null
          }
        </div>
      </div>
    </>
  );
};

export default Profile;