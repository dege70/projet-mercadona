import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink to="/catalogue" activeClassName="active">
            Catalogue
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin" activeClassName="active">
            Administration
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
