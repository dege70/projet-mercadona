import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(username, password);
      setLoading(false);
      navigate('/admin');
    } catch (error) {
      setError("Nom d'utilisateur où mot de passe incorrect");
      setLoading(false);
    }
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Utilisateur</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Entrer utilisateur"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autocomplete="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de Passe</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Entrer mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autocomplete="current-password"
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Chargement...' : 'Connecter'}
        </button>
      </form>
    </div>
  );
};

export default Login;
