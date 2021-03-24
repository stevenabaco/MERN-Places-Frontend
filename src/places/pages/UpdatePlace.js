import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";

import './PlaceForm.css';

const DUMMY_PLACES = [
	{
		id: "p1",
		title: "Empire State Building",
		description: "One  of the most famous sky scrapers in the world!",
		imageUrl:
			"https://images.unsplash.com/photo-1557137200-fec234cd5740?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGVtcGlyZSUyMHN0YXRlJTIwYnVpbGRpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
		address: "20 W 34th St, New York, NY 10001",
		location: {
			lat: 40.7484405,
			lng: -73.9878584,
		},
		creator: "u1",
	},
	{
		id: "p2",
		title: "Empire State Building",
		description: "One  of the most famous sky scrapers in the world!",
		imageUrl:
			"https://images.unsplash.com/photo-1557137200-fec234cd5740?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGVtcGlyZSUyMHN0YXRlJTIwYnVpbGRpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
		address: "20 W 34th St, New York, NY 10001",
		location: {
			lat: 40.7484405,
			lng: -73.9878584,
		},
		creator: "u2",
	},
];

const UpdatePlace = () => {
	const placeId = useParams().placeId;

	const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

	if (!identifiedPlace) {
		return (
			<div className="center">
				<h2>Could not find Place!</h2>
			</div>
		);
	}

	return (
		<form className='place-form'>
			<Input
				id="title"
				element="input"
				type="text"
				label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={() => { }}
        value={identifiedPlace.title}
        valid={true}
			/>
			<Input
				id="description"
				element="textarea"
				label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={() => { }}
        value={identifiedPlace.description}
        valid={true}
      />
      <Button type="submit" disabled={true}>
        UPDATE PLACE
      </Button>
		</form>
	);
};

export default UpdatePlace;
