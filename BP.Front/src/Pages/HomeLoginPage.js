import React from 'react';
import BPicon from "../Content/BPicon.png"
import RequestService from '../Services/RequestService';
import QRCode from 'react-qr-code';

const HomeLoginPage = () => {

    return (
        <div className='d-flex container-fluid vh-100 vw-100 bg-dark'>
            <div className='m-auto d-flex flex-column'>
                <img
                    src={BPicon}
                    className="ms-3"
                    style={{
                        height: "400px"
                    }}
                    alt='BP logo'
                />
                <a
                    href={RequestService.getSpotifyLoginUrl()}
                    className='btn btn-primary m-auto fw-bold w-50 login-btn'
                    style={{
                        padding: "3%"
                    }}
                >
                    Se connecter
                </a>
            </div>
        </div>
    );
};

export default HomeLoginPage;
