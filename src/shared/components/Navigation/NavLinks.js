import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLInks.css';

const NavLinks = props => {
	return (
		<ul className='nav-links'>
			<li>
				<NavLink to='/' exact>
					ALL USERS
				</NavLink>
			</li>
			<li>
				<NavLink to='/u1/places'>MY PLACES</NavLink>
			</li>
			<li>
				<NavLink to='/places/new'>ADD PLACE</NavLink>
			</li>
			<li>
				<NavLink to='/auth'>LOGIN</NavLink>
			</li>
		</ul>
	);
};

export default NavLinks;
