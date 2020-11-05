import React from 'react';
import { Card, CardContent, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../../components/Loading.component';
import { Link, useRouteMatch } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

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
    margin: "1rem 0"
  }
}));

const GET_USER = gql`
  query GetUser($id: ID!){
    getUser(id: $id){
      name
      picture
      helps {
        id
        title
        description
      }
      helpRequests {
        title
        id
        description
        createdAt
        help {
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

  console.log(data)

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
            data.getUser.helpRequests.length > 0 ?
              <>
                <Typography variant="h5" color="primary" >Recent helps offered: </Typography>
                {
                  data.getUser.helpRequests.map(helpRequest =>
                    <Card className={classes.card} elevation={5} >
                      <CardContent style={{ paddingBottom: "1rem" }}>
                        <Link to={`/help/${helpRequest.help.id}/help-offer/${helpRequest.id}`} style={{ textDecoration: "none" }}>
                          <Typography variant="h6" color="primary"><b>{helpRequest.title}</b></Typography>
                        </Link>
                        <Typography variant="body1" style={{ marginTop: "1rem" }}>{helpRequest.description}</Typography>
                      </CardContent>
                    </Card>
                  )
                }
              </>
              :
              null
          }
        </div>
        <div>
          {
            data.getUser.helps.length > 0 ?
              <>
                <Typography variant="h5" color="primary" >Recent helps asked: </Typography>
                {
                  data.getUser.helps.map(help =>
                    <Card className={classes.card} elevation={5} >
                      <CardContent style={{ paddingBottom: "1rem" }}>
                        <Link to={`/help/${help.id}`} style={{ textDecoration: "none" }}>
                          <Typography variant="h6" color="primary"><b>{help.title}</b></Typography>
                        </Link>
                        <Typography variant="body1" style={{ marginTop: "1rem" }}>{help.description}</Typography>
                      </CardContent>
                    </Card>
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