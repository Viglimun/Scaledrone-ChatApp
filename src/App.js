import React, { useState, useEffect } from 'react';
import Chat from './components/Chat';
import Login from './components/Login';
import './App.css';

const App = () => {
	const [loggedin, setLoggedin] = useState(false);
	const [username, setUsername] = useState('');
	const [drone, setDrone] = useState(null);
	const [member, setMember] = useState(null);

	// Dark/Light toggle and local storage to remember what the user choose last time
	const toggleDarkLightMode = () => {
		const isLightMode = document.body.classList.toggle('light-mode');
		localStorage.setItem('darkMode', isLightMode);
	};

	useEffect(() => {
		const darkMode = localStorage.getItem('darkMode') === 'true';
		if (darkMode) {
			document.body.classList.add('light-mode');
		}
	}, []);

	const onChangeUsername = (e) => {
		setUsername(e.target.value);
	};

	const onLogin = () => {
		if (username) {
			const drone = new window.Scaledrone('bUsRwTCOIfarrWZ7', {
				data: { username },
			});

			drone.on('open', (error) => {
				if (error) {
					return console.error(error);
				}

				setDrone(drone);
				setMember({
					id: drone.clientId,
					username,
				});
				setLoggedin(true);
			});
		}
	};

	return (
		<div>
			<button onClick={toggleDarkLightMode} className="toggle-mode-btn">
				Light/Dark mode
			</button>

			{loggedin ? (
				<Chat drone={drone} member={member} />
			) : (
				<Login
					username={username}
					changeUsername={onChangeUsername}
					onLogin={onLogin}
				/>
			)}
		</div>
	);
};

export default App;
