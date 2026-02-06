import { useEffect, useState } from "react";
import { API_KEY } from "./useFetchMovies"; 
/**
 * @param {string} selectedId 
 * @returns {Object} 
 */
export function useFetchMovieDetails(selectedId) {
 
  const [movie, setMovie] = useState({});
 
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {

    if (!selectedId) {
      setMovie({});
      setError("");
      return;
    }

    /**
      * @param {string} selectedId 
     */
    async function fetchMovieDetails(selectedId) {
      try {
        setIsLoading(true); 
        setError(null); 

        
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
        );

        
        if (!response.ok)
          throw new Error("Error al cargar los detalles de la película");

        const data = await response.json();

        
        setMovie(data);
      } catch (err) {
       
        setError(err.message);
        setMovie({});
      } finally {
        setIsLoading(false); 
      }
    }

    
    fetchMovieDetails(selectedId);
  }, [selectedId]); 

  
  return { movie, isLoading, error };
}
