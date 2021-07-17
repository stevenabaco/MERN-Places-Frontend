import React from 'react';

import './Welcome.css';

const Welcome = () => {
	return (
		<div id='welcome__container'>
			<div id="welcome__container__main" className='content__box'>
				<h1>Welcome to MERN PLACES</h1>
				<p>
					{' '}
					This website started out as a playground to practice the various
					coding skills I was learning. In the beginning it was a simple image
					gallery, but it has grown into a robust web app, and I'm continuing to
					update it with new features.
				</p>
				<p>
					I started with simple HTML, CSS and Javascript. I then learned ReactJS
					and refactored the code using it. Next I learned and implemented
					NodeJS with Express so I could build the backend server and API.
					Needing a place to securely store and persist all the User data, I
					added MongoDB together with Mongoose.
				</p>
				<p>
					So... my simple Places images gallery has been rebranded as "MERN
					Places", to reflect the stack its built on (MongoDb, Express, React,
					NodeJs) and the original "Places" image gallery it started out as.
				</p>
			</div>
			<div id="welcome__container__info" className='content__box'>
				<h3>
					For demo login use
				</h3>
				<h4 className='alert'>
					Email: test@test.com  <br/> Password : testing</h4>
			</div>
		</div>
	);
};

export default Welcome;
