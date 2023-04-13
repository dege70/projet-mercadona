import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, motDePasse);
      setLoading(false);
      navigate('/admin');
    } catch (error) {
      setError("Adresse email ou mot de passe incorrect");
      setLoading(false);
    }
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Adresse Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Entrez votre adresse email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="motDePasse">Mot de Passe</label>
          <input
            type="password"
            className="form-control"
            id="motDePasse"
            placeholder="Entrez votre mot de passe"
            value={motDePasse}
            onChange={e => setMotDePasse(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Chargement...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
};

export default Login;
