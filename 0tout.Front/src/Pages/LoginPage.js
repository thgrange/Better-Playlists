import React, { useState } from "react";
import LoginService from "../Services/LoginService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await LoginService.login(email, password);
      // Rediriger l'utilisateur vers la page d'accueil ou autre endroit
      // après la connexion réussie
    } catch (error) {
      setError("Adresse email ou mot de passe incorrect");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Adresse email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {error && <div>{error}</div>}
        <button type="submit">Connexion</button>
      </form>
    </div>
  );
}

export default LoginPage;
