import React from 'react';

import Card from '../../shared/components/UIElements/Card/Card';
import PlaceItem from './PlaceItem';
import Button from "../../shared/components/FormElements/Button/Button";
import './PlaceList.css';

const PlaceList = props => {
	if (props.items.length === 0) {
		return (
			<div className='place-list center'>
				<Card>
					<h2>No places Found. Do you want to create one?</h2>
					<Button to="/places/new">Share a Place</Button>
				</Card>
			</div>
		);
	}

	return (
		<ul className='place-list'>
			{props.items.map(place => (
				<PlaceItem
					key={place.id}
					id={place.id}
					image={place.image}
					title={place.title}
					description={place.description}
          address={place.address}
          creatorId={place.creator}
					coordinates={place.location}
					onDelete={props.onDeletePlace}
				/>
			))}
		</ul>
	);
};

export default PlaceList;
