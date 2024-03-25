import React, { useEffect, useState } from 'react';
import ProfileService from '../Services/ProfileService';
import ProfilePreview from '../Components/ProfilePreview';
import SpotifyPlayer from '../Components/SpotifyPlayer';

const HomePage = () => {
    const [profile, setProfile] = useState({
        display_name: ""
    });

    useEffect(() => {
        ProfileService.getConnectedUser().then((response) => {
            if (response.status === 200) {
                setProfile(response.data);
            }
        });
    }, []);

    return (
        <div className='d-flex container-fluid flex-column'>
            <ProfilePreview profile={profile} />
        </div>
    );
};

export default HomePage;
