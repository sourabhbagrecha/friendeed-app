import React from "react";
import { Link } from "react-router-dom";
import { Divider, Avatar, Typography, Card, CardContent } from '@material-ui/core'
import "./Feed.css";

function Feed({ items }) {

	return (
		<>
			<div>
				{
					items.map(help =>
						<Card elevation={5} className="requestCard">
							<CardContent>
								<Link to={`/help/${help.id}`} style={{ textDecoration: "none" }}>
									<Typography variant="h5" color="primary"><b>{help.title}</b></Typography>
								</Link>
								<Typography variant="body1">{help.description}</Typography>
								<Divider />
								<Link to={`/user/${help.fromUser.id}`} style={{ textDecoration: "none" }}>
									<div className="userInfo">
										<Avatar style={{ height: "1.5rem", width: "1.5rem" }} className="userAvatar" src={help.fromUser.picture} />
										<Typography variant="body1" color="textSecondary">{help.fromUser.name}</Typography>
									</div>
								</Link>
							</CardContent>
						</Card>
					)
				}
			</div>
		</>
	);
}

export default Feed;