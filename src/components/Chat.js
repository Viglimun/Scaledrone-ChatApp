import React, { useState, useEffect, useRef } from 'react';
import Input from './Input';

const Chat = (props) => {
	const [messages, setMessages] = useState([]);
	const bottomRef = useRef(null);

	useEffect(() => {
		const room = props.drone.subscribe('observable-chat-app');
		room.on('data', (data, member) => {
			const newMessages = [
				...messages,
				{ member, text: data.text, timestamp: data.timestamp },
			];
			setMessages(newMessages);
		});
	}, [messages, props.drone]);

	// Scroll to bottom
	useEffect(() => {
		if (bottomRef.current) {
			bottomRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages]);

	const onSendMessage = (message) => {
		props.drone.publish({
			room: 'observable-chat-app',
			message: {
				text: message,
				timestamp: Date.now(),
			},
		});
	};

	return (
		<div className="chat">
			<div className="chat-header">
				<h1>Welcome</h1>
			</div>
			<ul className="chat-messageList">
				{messages.map((m, i) => (
					<Message message={m} key={i} currentMember={props.member} />
				))}
				<div ref={bottomRef} />
			</ul>
			<Input onSendMessage={onSendMessage} />
		</div>
	);
};

function Message({ message, currentMember }) {
	const { member, text, timestamp } = message;
	const messageFromMe = member.id === currentMember.id;
	const className = messageFromMe
		? 'messages-message currentMember'
		: 'messages-message';

	return (
		<li className={className}>
			<span>{member.clientData.avatar}</span>
			<div className="message-content">
				<div className="username">{member.clientData.username}</div>
				<div className="text">
					{text}
					<span className="timestamp">
						{new Date(timestamp).toLocaleTimeString([], {
							hour: 'numeric',
							minute: 'numeric',
						})}
					</span>
				</div>
			</div>
		</li>
	);
}

export default Chat;
