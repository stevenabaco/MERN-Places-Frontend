import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
	const USERS = [
		{
			id: 'u1',
			name: 'Steven Abaco',
			image:
				'https://images.unsplash.com/photo-1615747476205-a76551ac8636?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
			places: 3,
		},
	];
	return <UsersList items={USERS} />;
};

export default Users;
