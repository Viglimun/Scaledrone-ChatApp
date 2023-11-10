import React, { useState } from 'react';

// Capitalizes the first letter
function capFirst(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// Generates a random integer
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

// Generates a random username
function generateName() {
	// List of adjectives for the first part of a username
	var name1 = [
		'unwitting',
		'unwritten',
		'upbeat',
		'upright',
		'upset',
		'urban',
		'usable',
		'used',
		'useful',
		'useless',
		'utilized',
		'utter',
		'vacant',
		'vague',
		'vain',
		'valid',
		'valuable',
		'vapid',
		'variable',
		'vast',
		'velvety',
	];
	// List of nouns for the second part of a username
	var name2 = [
		'fix',
		'hire',
		'internal',
		'join',
		'kill',
		'sensitive',
		'tap',
		'win',
		'attack',
		'claim',
		'constant',
		'drag',
		'drink',
		'guess',
		'minor',
		'pull',
		'raw',
		'soft',
		'solid',
		'wear',
		'weird',
		'wonder',
		'annual',
		'count',
		'dead',
		'doubt',
		'feed',
	];
	// Combine a random adjective and noun to create a username
	var name =
		capFirst(name1[getRandomInt(0, name1.length)]) +
		' ' +
		capFirst(name2[getRandomInt(0, name2.length)]);
	return name;
}

function Login(props) {
	const [username, setUsername] = useState(props.username || '');

	// Updates the username state and propagates the change to the parent component
	const handleChangeUsername = (event) => {
		setUsername(event.target.value);
		if (props.changeUsername) {
			props.changeUsername(event);
		}
	};

	// Generates a new random username and updates the state and parent component
	const handleGenerateName = () => {
		const newName = generateName();
		setUsername(newName);
		if (props.changeUsername) {
			props.changeUsername({ target: { value: newName } });
		}
	};

	// Triggers the login action when the Enter key is pressed
	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			props.onLogin();
		}
	};

	return (
		<div className="login">
			<div className="form-wrapper">
				<div className="username">
					<label>Welcome</label>
				</div>
				<div className="input home">
					<input
						value={username}
						onChange={handleChangeUsername}
						onKeyDown={handleKeyPress}
						placeholder="Enter username"
					/>
				</div>
				<br />
				<div className="button">
					<button className="btn" onClick={props.onLogin} type="button">
						Join chat
					</button>
					<p className="or">or</p>
					<button className="btn1" onClick={handleGenerateName} type="button">
						Generate random name
					</button>
				</div>
			</div>
		</div>
	);
}

export default Login;
