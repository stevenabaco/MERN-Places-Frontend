import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';


const DUMMY_PLACES = [
	{
		id: 'p1',
		title: 'Empire State Building',
		description: 'One  of the most famous sky scrapers in the world!',
		imageUrl:
			'https://images.unsplash.com/photo-1557137200-fec234cd5740?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGVtcGlyZSUyMHN0YXRlJTIwYnVpbGRpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
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
			'https://images.unsplash.com/photo-1557137200-fec234cd5740?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGVtcGlyZSUyMHN0YXRlJTIwYnVpbGRpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
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
