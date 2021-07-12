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
					<h2>Seems like no places are shared for this user. Do you want to share one?</h2>
					<Button to="/places/new">YES</Button>
					<Button to="/">NO</Button>
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
