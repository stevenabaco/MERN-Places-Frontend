import React, { useState, useContext } from 'react';

import Input from '../../shared/components/FormElements/Input/Input';
import Button from '../../shared/components/FormElements/Button/Button';
import Card from '../../shared/components/UIElements/Card/Card';
import { useForm } from '../../shared/hooks/form-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import './Auth.css';
import { AuthContext } from '../../shared/context/auth-context';

const Auth = () => {
	const auth = useContext(AuthContext);
	const [isLoginMode, setIsLoginMode] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	const [formState, inputHandler, setFormData] = useForm(
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

	// Handles switching from SignIn to SignUp for Auth
	const switchModeHandler = () => {
		if (!isLoginMode) {
			setFormData(
				{
					...formState.inputs, // Bring in existing state
					name: undefined, // Used to drop the name field when switching to Sign in Mode
				},
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		} else {
			setFormData(
				{
					...formState.inputs,
					name: {
						value: '',
						isValid: false,
					},
				},
				false
			);
		}
		setIsLoginMode(prevMode => !prevMode);
	};

	const authSubmitHandler = async event => {
		event.preventDefault();

		setIsLoading(true);

		if (isLoginMode) {
			try {
				const response = await fetch('http://localhost:5000/api/users/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
					}),
				});

				const responseData = await response.json();

				if (!response.ok) { // Check if there is 400 or 500 response so we can throw it
					throw new Error(responseData.message);
				}

				setIsLoading(false);
				auth.login();
			} catch (err) {

				setIsLoading(false);
				setError(err.message || 'Something went wrong, please try again.');
			}
			
		} else {
			try {
				const response = await fetch('http://localhost:5000/api/users/signup', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name: formState.inputs.name.value,
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
					}),
				});

				const responseData = await response.json();

				if (!response.ok) {
					throw new Error(responseData.message);
				}

				console.log(responseData);
				setIsLoading(false);
				auth.login();
			} catch (err) {
				console.log(err); // Temp error handling
				setIsLoading(false);
				setError(err.message || 'Something went wrong, please try again.');
			}
		}
	};

	const errorHandler = () => {
		setError(null);
	};
	return (
		<>
			<ErrorModal error={error} onClear={errorHandler} />
			<Card className='authentication'>
				{isLoading && <LoadingSpinner asOverlay />}
				<h2>Login Required</h2>
				<hr />
				<form onSubmit={authSubmitHandler}>
					{!isLoginMode && (
						<Input
							element='input'
							id='name'
							type='text'
							label='Your Name'
							validators={[VALIDATOR_REQUIRE()]}
							onInput={inputHandler}
							errorText='Please enter a name'
						/>
					)}
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
						{isLoginMode ? 'LOGIN' : 'SIGNUP'}
					</Button>
				</form>
				<Button inverse onClick={switchModeHandler}>
					SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
				</Button>
			</Card>
		</>
	);
};

export default Auth;
