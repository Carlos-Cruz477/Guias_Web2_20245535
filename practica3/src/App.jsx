import { useState, useEffect } from "react";
import { Logo, Nav, NumResults, Search } from "./components/Nav";
import { Box } from "./components/Box";
import { MovieList } from "./components/Movie";
import {
  WatchedMoviesContainer,
  WatchedMoviesList,
  WatchedSummary,
} from "./components/WatchedMovie";
import { useFetchMovies } from "./hooks/useFetchMovies";
import { MovieDetails } from "./components/MovieDetails";


export default function App() {

  const [query, setQuery] = useState("");


  const { movies, isLoading, error } = useFetchMovies(query);

  const [watched, setWatched] = useState(initialWatched);

  const [selectedId, setSelectedId] = useState(null);

  useEffect(
    ()=>{
      localStorage.setItem('watched', JSON.stringify(watched))
    }, [watched]
  )

  /**
   * @param {string} id 
   */

  function initialWatched(){
    const localStorageCard = localStorage.getItem('watched')
    return localStorageCard? JSON.parse(localStorageCard) : []
  }

  function handleRemove(selectedMovie){
    const updatedWatched = watched.filter(watchedMovie => watchedMovie.imdbID !== selectedMovie.imdbID);
    console.log(watched, updatedWatched);
    setWatched(updatedWatched);
  }

  function handleSelectMovie(id) {
    setSelectedId(id);
  }


  function handleCloseMovie() {
    setSelectedId(null);
  }

  /**
   * @param {Object} movie
   */
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Nav>

      <main className="main">
        <Box>
          {isLoading && <p className="loader">Cargando...</p>}
          {error && <p className="error">⛔ {error}</p>}
          <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
        </Box>

        <Box>
          <WatchedMoviesContainer>
            {selectedId ? (
              <MovieDetails
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched={watched}
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList watched={watched} handleRemove={handleRemove}/>
              </>
            )}
          </WatchedMoviesContainer>
        </Box>
      </main>
    </>
  );
}
