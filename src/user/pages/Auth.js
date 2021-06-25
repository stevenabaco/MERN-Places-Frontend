import React from 'react';

import Input from '../../shared/components/FormElements/Input/Input';
import Button from '../../shared/components/FormElements/Button/Button';
import Card from '../../shared/components/UIElements/Card/Card';
import { useForm } from '../../shared/hooks/form-hook';
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import './Auth.css';

const Auth = () => {
	const [formState, inputHandler] = useForm(
		{
			email: {
				value: '',
				isValid: false,
			},
			password: {
				value: '',
				isValid: false,
			},
		},
		false
	);

	const authSubmitHandler = event => {
		event.preventDefault();
		console.log(formState.inputs);
	};
	return (
		<Card className='authentication'>
			<form onSubmit={authSubmitHandler}>
				<h2>Login Required</h2>
				<hr />
				<Input
					id='email'
					element='input'
					type='email'
					label='Email'
					validators={[VALIDATOR_EMAIL()]}
					errorText='Please enter a valid Email address'
					onInput={inputHandler}
				/>
				<Input
					id='password'
					element='input'
					type='password'
					label='Password'
					validators={[VALIDATOR_MINLENGTH(5)]}
					errorText='Please enter a valid password, at least 5 characters'
					onInput={inputHandler}
				/>
				<Button type='submit' disabled={!formState.isValid}>
					LOGIN
				</Button>
			</form>
		</Card>
	);
};

export default Auth;
