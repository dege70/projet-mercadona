import { useState, useEffect } from "react";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer la valeur de isAuthenticated depuis le localStorage ou initialiser à false si non définie
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true" || false
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!endpoint) {
          setIsLoading(false);
          return;
        }
        console.log(`${process.env.REACT_APP_BASE_URL}/${endpoint}`);
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${endpoint}`);
        const json = await response.json();
        setData(json);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [endpoint]);

  // Mettre à jour la valeur de isAuthenticated dans le localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return { data, isLoading, error, isAuthenticated, setIsAuthenticated };
};

export default useFetch;
