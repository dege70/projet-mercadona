import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from "../../hoc/Layout/Layout.module.css"
import axios from 'axios';

const Login = () => {
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

  console.log('process.env.REACT_APP_BASE_URL:', process.env.REACT_APP_BASE_URL);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    console.log('username:', username);
    console.log('password:', password);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
        username: username,
        password: password
      });
    
      console.log('response:', response);
      console.log('response.data:', response.data);
      
      if (response.data === 'Success') {
        localStorage.setItem("session", "true");
        localStorage.setItem('username', response.config.data.username);
        navigate('/admin');
        console.log('Redirection vers /admin');
      } else {
        setError('Nom d\'utilisateur ou mot de passe incorrect');
        setLoading(false);
      }
    } catch (error) {
      console.log('Erreur lors de la requête HTTP:', error);
      console.log('Erreur message:', error.message);
      setError('Nom d\'utilisateur ou mot de passe incorrect');
      setLoading(false);
    }    
  };     

  console.log('localStorage.session:', localStorage.getItem('session'));
  console.log('localStorage.username:', localStorage.getItem('username'));
  console.log('isLoading:', isLoading);

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
  console.log('Suppression de la clé "username" de localStorage');
});

export default Login;
