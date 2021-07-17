import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLInks.css';

const NavLinks = props => {
	const auth = useContext(AuthContext);

	return (
		<ul className='nav-links'>
			{<NavLink to='/'>{!auth.isLoggedIn ? 'HOME' : 'PLACES'}</NavLink>}

			<li>
				<NavLink to='/users' exact>
					USERS
				</NavLink>
			</li>

			{!auth.isLoggedIn ? (
				<li>
					<NavLink to={`/places`}>PLACES</NavLink>
				</li>
			) : (
				<NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
			)}
			{auth.isLoggedIn && (
				<li>
					<NavLink to='/places/new'>ADD PLACE</NavLink>
				</li>
			)}
			{!auth.isLoggedIn && (
				<li>
					<NavLink to='/auth'>LOGIN</NavLink>
				</li>
			)}
			{auth.isLoggedIn && (
				<li>
					<button onClick={auth.logout}>LOGOUT</button>
				</li>
			)}
		</ul>
	);
};

export default NavLinks;
