import { Avatar, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import "./Chat.css";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import InsertEmoticonOutlinedIcon from "@material-ui/icons/InsertEmoticonOutlined";
import { SettingsInputAntenna } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import axios from "./axios";
function Chat({ messages }) {
	const [input, setInput] = useState("");

	const sendMessage = async (e) => {
		e.preventDefault();

		await axios.post("/messages/new", {
			message: input,
			name: "Demo",
			timestamp: "Just Now",
			received: true,
		});

		setInput("");
	};

	return (
		<div className="chat">
			<div className="chat__header">
				<Avatar />
				<div className="chat__headerInfo">
					<h3>Room name</h3>
					<p>Last seen at...</p>
				</div>
				<div className="chat__headerRight">
					<IconButton>
						<SearchOutlinedIcon />
					</IconButton>
					<IconButton>
						<AttachFileOutlinedIcon />
					</IconButton>
					<IconButton>
						<MoreVertOutlinedIcon />
					</IconButton>
				</div>
			</div>
			<div className="chat__body">
				{messages.map((message) => (
					<p
						className={`chat__message ${message.received && "chat__reciever"}`}
					>
						<span className="chat__name">{message.name}</span>
						{message.message}
						<span className="chat__timestamp">{message.timestamp}</span>
					</p>
				))}
			</div>
			<div className="chat__footer">
				<InsertEmoticonOutlinedIcon />
				<form>
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Type a message"
						type="text"
					/>
					<button type="submit" onClick={sendMessage}>
						Send a message
					</button>
				</form>
				<MicIcon />
			</div>
		</div>
	);
}

export default Chat;
