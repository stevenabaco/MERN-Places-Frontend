import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';


const DUMMY_PLACES = [
	{
		id: 'p1',
		title: 'Empire State Building',
		description: 'One  of the most famous sky scrapers in the world!',
		imageUrl:
			'https://images.unsplash.com/photo-1555109307-f7d9da25c244?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZW1waXJlJTIwc3RhdGUlMjBidWlsZGluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
		address: '20 W 34th St, New York, NY 10001',
		location: {
			lat: 40.7484405,
			lng: -73.9878584,
		},
		creator: 'u1',
	},
	{
		id: 'p2',
		title: 'The Empire State Building',
		description: 'One  of the most famous sky scrapers in the world!',
		imageUrl:
			'https://images.unsplash.com/photo-1544608644-1778e20d070f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGVtcGlyZSUyMHN0YXRlJTIwYnVpbGRpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
		address: '20 W 34th St, New York, NY 10001',
		location: {
			lat: 40.7484405,
			lng: -73.9878584,
		},
		creator: 'u2',
	},
];

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
	return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
