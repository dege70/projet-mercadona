import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Header/Navigation/Navigation';

function HomePage() {
  return (
    <div>
      <Navigation />
      <h1>Bienvenue sur l'application Mercadona !</h1>
      <p>Cette application vous permet de consulter les promotions en cours chez Mercadona.</p>
      <Link to="/catalogue">Accéder au catalogue</Link>
    </div>
  );
}

export default HomePage;
