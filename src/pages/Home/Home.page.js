import React from 'react'
import Loading from '../../components/Loading.component'
import { gql, useQuery } from '@apollo/client'
import Feed from '../../components/Feed/Feed.component'

const GET_FEED = gql`
	query getFeed{
		queryHelp{
      id
      title
      description
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
        <Feed items={data.queryHelp} />
      </div>
    </>
  )
}

export default Home
