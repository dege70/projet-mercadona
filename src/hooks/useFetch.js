import { useState, useEffect } from "react";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
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

  return { data, isLoading, error };
};

export default useFetch;
