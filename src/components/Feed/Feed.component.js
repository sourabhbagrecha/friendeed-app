import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent } from '@material-ui/core'
import "./Feed.css";
import UserWithTimeAgo from "../UserWithTimeAgo.component";

function Feed({ items }) {

	return (
		<>
			<div className="Feed">
				<Typography variant="h4" color="primary">Recent Helps Requested</Typography>
				{
					items.map(help =>
						<Card elevation={5} className="helpCard">
							<CardContent>
								<Link to={`/help/${help.id}`} style={{ textDecoration: "none" }}>
									<Typography variant="h5" color="primary"><b>{help.title}</b></Typography>
								</Link>
								<Typography variant="body1">{help.description}</Typography>
								<UserWithTimeAgo user={help.fromUser} createdAt={help.createdAt} />
							</CardContent>
						</Card>
					)
				}
			</div>
		</>
	);
}

export default Feed;