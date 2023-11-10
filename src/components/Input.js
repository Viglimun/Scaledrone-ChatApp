import React, { useState, useRef, useEffect } from 'react';

const Input = ({ onSendMessage }) => {
	const [message, setMessage] = useState('');
	const inputRef = useRef(null);

	const onChange = (e) => {
		setMessage(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (message.trim() !== '') {
			onSendMessage(message);
			setMessage('');
		} else {
			alert('No message to send.');
		}
	};

	// Focus on input
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [message]);

	return (
		<form onSubmit={onSubmit}>
			<input
				ref={inputRef}
				autoFocus
				onChange={onChange}
				value={message}
				type="text"
				placeholder="..."
			/>
			<button type="submit">Send</button>
		</form>
	);
};

export default Input;
