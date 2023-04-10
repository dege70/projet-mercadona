import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Bienvenue sur l'application Mercadona !</h1>
      <p>Cette application vous permet de consulter les promotions en cours chez Mercadona.</p>
      <Link to="/catalogue">Accéder au catalogue</Link>
    </div>
  );
}

export default HomePage;
