import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginService from '../Services/LoginService';

const LoginPage = () => {
    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate("/");
    }

    useEffect(() => {
        var query = window.location.hash;

        if (query.indexOf("#") === 0) {
            query = query.slice(1);
        }

        const queryParameters = new URLSearchParams(query)
        const accessToken = queryParameters.get("access_token");
        const expiresIn = queryParameters.get("expires_in");

        LoginService.login(accessToken, expiresIn, goToHomePage);
    })

    return (
        <div className='d-flex container-fluid vh-100 vw-100'>
            <div className="spinner-border m-auto text-primary" role="status">
            </div>
        </div>
    );
}

export default LoginPage;