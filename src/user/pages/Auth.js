import React, { useState, useContext } from 'react';

import Input from '../../shared/components/FormElements/Input/Input';
import Button from '../../shared/components/FormElements/Button/Button';
import Card from '../../shared/components/UIElements/Card/Card';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import './Auth.css';
import ImageUpload from '../../shared/components/FormElements/ImageUploads/ImageUpload';
import { AuthContext } from '../../shared/context/auth-context';

const Auth = () => {
	const auth = useContext(AuthContext);
	const [isLoginMode, setIsLoginMode] = useState(true);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
					image: {
						value: null,
						isValid: false
					}
				},
				false
			);
		}
		setIsLoginMode(prevMode => !prevMode);
	};

	const authSubmitHandler = async event => {
		event.preventDefault();

		console.log(formState.inputs);

		if (isLoginMode) {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/users/login`,
					'POST',
					JSON.stringify({
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
					}),
					{
						'Content-Type': 'application/json',
					}
				);
				auth.login(responseData.userId, responseData.token);
			} catch (err) {}
		} else {
			try {
				const formData = new FormData();
				formData.append('email', formState.inputs.email.value);
				formData.append('name', formState.inputs.name.value);
				formData.append('password', formState.inputs.password.value);
				formData.append('image', formState.inputs.image.value);
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/users/signup`,
					'POST',
					formData
				);
				auth.login(responseData.userId, responseData.token);
			} catch (err) {}
		}
	};

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
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
					{!isLoginMode && <ImageUpload center id="image" onInput={ inputHandler} errorText="Pleease provide an image"/>}
					<Input
						id='password'
						element='input'
						type='password'
						label='Password'
						validators={[VALIDATOR_MINLENGTH(6)]}
						errorText='Please enter a valid password, at least 6 characters'
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
