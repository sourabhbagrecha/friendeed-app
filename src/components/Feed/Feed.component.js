import React from "react";
import { Link } from "react-router-dom";
import { Typography, Paper } from '@material-ui/core'
import UserWithTimeAgo from "../UserWithTimeAgo.component";
import "./Feed.css";

function Feed({ items }) {

	return (
		<>
			<div className="Feed">
				<Typography variant="h5" color="primary">Recent Helps Requested</Typography>
				{
					items.map(helpRequest =>
						<Paper elevation={2} className="helpCard">
							<Link to={`/help/${helpRequest.id}`} style={{ textDecoration: "none" }}>
								<Typography variant="h6" color="primary"><b>{helpRequest.title}</b></Typography>
							</Link>
							<Typography variant="body1">{helpRequest.description}</Typography>
							<UserWithTimeAgo user={helpRequest.fromUser} createdAt={helpRequest.createdAt} />
						</Paper>
					)
				}
			</div>
		</>
	);
}

export default Feed;