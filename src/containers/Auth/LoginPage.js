import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from "../../hoc/Layout/Layout.module.css"
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState(localStorage.getItem('username') || "");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('session') === 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log(process.env.REACT_APP_BASE_URL); // Affiche l'URL de base dans la console
  
    console.log('username:', username);
    console.log('password:', password);
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/loginpage`, {
        username: username,
        password: password
      });
  
      if (response.data === 'Success') {
        localStorage.setItem("session", "true");
        localStorage.setItem('username', response.data.username);
        navigate('/admin');
      } else {
        setError('Nom d\'utilisateur ou mot de passe incorrect');
        setLoading(false);
      }
    } catch (error) {
      setError('Nom d\'utilisateur ou mot de passe incorrect');
      setLoading(false);
    }
  };     

  return (
    <div className="container">
        <h1>Accès Administrateur :</h1>
      <form onSubmit={handleSubmit} className={classes.FormBox}>
        <div className={classes.Input}>
          <label htmlFor="username">Utilisateur</label>
          <input
            className="form-control"
            type="text"
            id="username"
            name="username"
            value={username}
            placeholder="Entrez l'Utilisateur"
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className={classes.Input}>
          <label htmlFor="password">Mot de passe</label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Entrez votre mot de passe"
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className={classes.submit}>
          <input
          type="submit"
          disabled={isLoading} value={isLoading ? 'Chargement...' : 'Se connecter'} />
        </div>
      </form>
    </div>
  );
};

window.addEventListener("unload", function() {
  localStorage.removeItem("username");
});

export default LoginPage;
