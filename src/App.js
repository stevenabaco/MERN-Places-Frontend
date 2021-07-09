import React, { useState, useCallback, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

console.log(`${process.env.REACT_APP_GOOGLE_API_KEY}`);

const App = () => {
	const [token, setToken] = useState(false);
	const [userId, setUserId] = useState(false);

	const login = useCallback((uid, token) => {
		setToken(token);
		localStorage.setItem('userData', JSON.stringify({userId: uid, token: token}))
		setUserId(uid);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);
		localStorage.removeItem('userData');
	}, []);

		useEffect(() => {
			const storedData = JSON.parse(localStorage.getItem('userData'));
			if (storedData && storedData.token) {
				login(storedData.userId, storedData.token);
			}
		}, [login]);

	let routes;

	if (token) {
		routes = (
			<Switch>
				<Route path='/' exact>
					<Users />
				</Route>
				<Route path='/:userId/places' exact>
					<UserPlaces />
				</Route>
				<Route path='/places/new' exact>
					<NewPlace />
				</Route>
				<Route path='/places/:placeId'>
					<UpdatePlace />
				</Route>
				<Redirect to='/' />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route exact path='/'>
					<Users />
				</Route>
				<Route exact path='/:userId/places'>
					<UserPlaces />
				</Route>
				<Route path='/auth'>
					<Auth />
				</Route>
				<Redirect to='/auth' />
			</Switch>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				userId: userId,
				login: login,
				logout: logout,
			}}>
			<Router>
				<MainNavigation />
				<main>
					<Switch>{routes}</Switch>
				</main>
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
