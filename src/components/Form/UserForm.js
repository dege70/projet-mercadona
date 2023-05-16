import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAdmin } from "../../services/user";
import classes from "../../hoc/Layout/Layout.module.css";
import Navigation from "../../containers/Admin/Navigation";

const UserForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createAdmin({ username, password });
      navigate("/admin");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <Navigation />
      <h2>Créer un utilisateur administrateur</h2>
      <form onSubmit={handleSubmit} className={classes.FormBox}>
        <div className={classes.Input}>
          <label htmlFor="username">Nom d'utilisateur:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </div>
        <div className={classes.Input}>
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        <div className={classes.submit}>
          <input
            type="submit"
            disabled={isLoading}
            value={isLoading ? "Chargement..." : "Créer"}
          />
        </div>
      </form>
    </div>
  );
};

export default UserForm;