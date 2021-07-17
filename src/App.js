import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';

import Welcome from './home/pages/Welcome';
import Users from './user/pages/Users';
import Places from './places/pages/Places';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

const App = () => {
	const { token, login, logout, userId } = useAuth();

	let routes;

	if (token) {
		routes = (
			<Switch>
				<Route path='/' exact>
					<Places />
				</Route>
				<Route exact path='/users'>
					<Users />
				</Route>
				<Route path='/:userId/places' exact>
					<UserPlaces />
				</Route>
				<Route exact path='/places'>
					<Places />
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
					<Welcome />
				</Route>
				<Route exact path='/places'>
					<Places />
				</Route>
				<Route exact path='/users'>
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
