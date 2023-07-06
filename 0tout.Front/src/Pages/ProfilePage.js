import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import UserService from '../Services/UserService';

const ProfilePage = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Requête pour récupérer les données de l'utilisateur
    // ...

    UserService.getConnecteduser().then(data =>
      {
        var profile = data.data;
        setUserData({
          firstName: profile.firstname,
          lastName: profile.lastname,
          email: profile.email,
          birthDate: format(new Date(profile.birthDate), 'dd/MM/yyyy')
        });
      })
  }, []);

  return (
    <div>
      <h1>Profil de l'utilisateur</h1>
      <p>Nom: {userData.lastName}</p>
      <p>Prénom: {userData.firstName}</p>
      <p>Email: {userData.email}</p>
      <p>Date de naissance: {userData.birthDate}</p>
    </div>
  );
};

export default ProfilePage;
