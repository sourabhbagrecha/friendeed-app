import React from "react";
import { useHistory } from "react-router-dom";
import { Divider, Avatar, Typography, Card, CardContent, ButtonBase } from '@material-ui/core'
import "./Feed.css";


function Feed({ items }) {
	const history = useHistory();

	return (
		<>
			<div className="Feed">
				<h1 className="page-heading">Feed</h1>
			</div>
			<div>
				{
					items.map(help =>
						<Card elevation={5} style={{ backgroundColor: "rgb(28, 46, 163)" }} className="helpCard">
							<CardContent>
								<ButtonBase onClick={() => history.push(`/help/${help.id}`)} className="helpCardButtonBase">
									<Typography variant="h5" color="primary"><strong>{help.title}</strong></Typography>
									<Divider />
									<Typography variant="body1">{help.description}</Typography>
								</ButtonBase>
								<div className="userInfo">
									<Avatar style={{height: "1.5rem", width: "1.5rem"}} className="userAvatar" src={help.fromUser.picture} />
									<Typography variant="body1">{help.fromUser.name}</Typography>
								</div>
							</CardContent>
						</Card>
					)
				}
			</div>
		</>
	);
}

export default Feed;