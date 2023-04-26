import { useState, useEffect } from "react";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem('session') === 'true');
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!endpoint) {
          setIsLoading(false);
          return;
        }
        if (endpoint && !isAuthenticated) {
          setIsLoading(false);
          return;
        }
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${endpoint}`);
        const json = await response.json();
        setData(json);

        // Récupération des informations de l'utilisateur depuis la réponse du backend
        const { username } = json;
        localStorage.setItem('session', true);
        localStorage.setItem('username', username);
        console.log("Test dans useFetch : ", localStorage.getItem('username'));

        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [endpoint, isAuthenticated]);

  return { data, isLoading, error, isAuthenticated };
};

export default useFetch;
