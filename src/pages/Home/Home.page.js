import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../components/Loading.component'
import Feed from '../../components/Feed/Feed.component'

const GET_FEED = gql`
	query getFeed{
		queryHelpRequest{
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
`;

function Home() {
	const { data, loading, error } = useQuery(GET_FEED);

	if (loading) return <Loading />
	if (error) return <p>{error.message}</p>
  return (
    <>
      <div className="Home">
        <Feed items={data.queryHelpRequest} />
      </div>
    </>
  )
}

export default Home
