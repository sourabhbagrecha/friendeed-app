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
					items.map(help =>
						<Paper elevation={5} className="helpCard">
							<Link to={`/help/${help.id}`} style={{ textDecoration: "none" }}>
								<Typography variant="h6" color="primary"><b>{help.title}</b></Typography>
							</Link>
							<Typography variant="body1">{help.description}</Typography>
							<UserWithTimeAgo user={help.fromUser} createdAt={help.createdAt} />
						</Paper>
					)
				}
			</div>
		</>
	);
}

export default Feed;