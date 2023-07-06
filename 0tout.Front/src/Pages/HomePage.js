import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [userProfile, setUserProfile] = useState(null);

    const handleProfileClick = () => {
        // code pour accéder au profil de l'utilisateur
    };

    return (
        <div>
            <header>
                <nav>
                    <Link to="/profile">
                        <button>Profil</button>
                    </Link>
                </nav>
            </header>
            <main>
                {/* Contenu de la page */}
            </main>
        </div>
    );
};

export default HomePage;
