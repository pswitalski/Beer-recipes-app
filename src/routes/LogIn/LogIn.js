import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useStateIfMounted } from 'use-state-if-mounted';

import Button from 'components/Button/Button';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import LoggedUserContext from 'context/LoggedUserContext';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

import {logIn, info } from 'routes/LogIn/LogIn.module.scss';

const loginUrl = 'https://beer-recipes-app-backend.herokuapp.com/auth/local';

const initialInputValue = {
    login: '',
    password: ''
}

const LogIn = () => {

    const [inputValue, setInputValue] = useStateIfMounted(initialInputValue);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const UserContext = useContext(LoggedUserContext)

    const updateInputValue = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.id]: e.target.value
        })
    }

    const verifyLoginForm =() => {
        if (inputValue.login === '' || inputValue.password === '') {
            setErrorMessage('You must provide all the information.')
            return false;
        } else {
            setErrorMessage('')
            return true;
        }
    }

    const logInHandler = (e) => {
        e.preventDefault();
        const isApproved = verifyLoginForm();
        if (isApproved) {
            setIsLoading(true);
            axios.post(loginUrl, {
                identifier: inputValue.login,
                password: inputValue.password
            })
            .then(response => {
                // console.log(response);
                setErrorMessage('');
                localStorage.setItem('token', response.data.jwt);
                localStorage.setItem('username', response.data.user.username);
                UserContext.setUser({
                    userName: response.data.user.username,
                    token: response.data.jwt,
                    isUserLoggedIn: true
                })
                setIsLoading(false);
                setIsLoggedIn(true);
            })
            .catch(error => {
                console.log(error.response);
                setErrorMessage(error.response.data.data[0].messages[0].message);
                setIsLoading(false);
            })
        }
    }

    return(
        <>
        <form className={logIn}>
            <h2>Log In</h2>
            <label htmlFor="login">Login:</label>
            <input type="text" id="login" value={inputValue.login} onChange={updateInputValue} />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={inputValue.password} onChange={updateInputValue} />
            <ErrorMessage error={errorMessage} />
            <Button content="Log In" clickHandler={logInHandler} type="submit" />
            <LoadingSpinner isLoading={isLoading} />
            {isLoggedIn ? <Redirect to="/search" /> : null}
            {UserContext.user.isUserLoggedIn ? <Redirect to="/search" /> : null}
        </form>
        <p className={info} >When the app is idle for a while, the backend API goes to sleep because of the free plan on Heroku. It then needs a moment to start working again. Therefore, the first login attempts may wait a little longer for a response.</p>
        </>
    )
}

export default LogIn;