import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';

console.log(`${process.env.REACT_APP_GOOGLE_API_KEY}`);

const App = () => {
	return (
		<Router>
			<MainNavigation />
			<main>
				<Switch>
					<Route exact path='/'>
						<Users />
					</Route>
					<Route exact path='/:userId/places'>
						<UserPlaces/>
					</Route>
					<Route exact path='/places/new'>
						<NewPlace />
					</Route>
					<Redirect to='/' />
				</Switch>
			</main>
		</Router>
	);
};

export default App;
