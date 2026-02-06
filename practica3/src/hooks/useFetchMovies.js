import { useEffect, useState } from "react";


export const API_KEY = "a25fe51e";

/**

 * @param {string} query 
 * @returns {Object}

 */
export function useFetchMovies(query) {

  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }


  
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError(null); 


        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
        ); 

      
        if (!response.ok) throw new Error("Error al cargar películas");

        const data = await response.json();

        
        if (data.Response === "False")
          throw new Error("No se encontraron resultados");

  
        setMovies(data.Search);
      } catch (err) {
        
        setError(err.message);
        setMovies([]);
      } finally {
        setIsLoading(false); 
      }
    }

    
    fetchMovies();
  }, [query]); 

  
  return { movies, isLoading, error };
}
