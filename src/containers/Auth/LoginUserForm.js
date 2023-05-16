import React, { useState, useEffect } from "react";
import { authenticateUser } from "../../services/user";
import { Link, useNavigate } from "react-router-dom";
import classes from "../../hoc/Layout/Layout.module.css";

const LoginUserForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user_session") === "true") {
      navigate("/catalogue");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await authenticateUser({ username, password });
      if (response.data.message === 'Authentification réussie') {
        if (localStorage.getItem('user_session') !== 'true') {
          localStorage.setItem('user_session', 'true');
        }
        navigate('/catalogue');
      } else {
        setError('Nom d\'utilisateur ou mot de passe incorrect');
      }
    } catch (error) {
      console.error(error);
      setError('Une erreur s\'est produite lors de l\'authentification');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit} className={classes.FormBox}>
        <div className={classes.Input}>
          <label htmlFor="username">Nom d'utilisateur:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Entrez l'Utilisateur"
            autoComplete="off"
            required
          />
        </div>
        <div className={classes.Input}>
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            autoComplete="off"
            required
          />
        </div>
        {error && <div className={classes.Error}>{error}</div>}
        <div className={classes.submit}>
          <input
          type="submit"
          disabled={isLoading} value={isLoading ? 'Chargement...' : 'Se connecter'} />
        </div>
      </form>
      <Link to="/creeruncompte">Vous n'avez pas encore de compte ?</Link>
    </div>
  );
};

window.addEventListener("beforeunload", function() {
  // Supprimer la clé de session de l'utilisateur non-administrateur
  localStorage.removeItem("user_session");
});

export default LoginUserForm;
