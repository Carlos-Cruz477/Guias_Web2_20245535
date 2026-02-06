export function WatchedMoviesContainer({ children }) {
  return <>{children}</>;
}

export function WatchedMoviesList({ watched, handleRemove}) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} handleRemove={handleRemove}/>
      ))}
    </ul>
  );
}


export function WatchedMovie({ movie, handleRemove}) {


  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={()=>handleRemove(movie)}>X</button>
      </div>
    </li>
  );
}

/**
 * @param {number[]} arr 
 * @returns {number} 
 */
const calculateAverage = (arr) =>
  arr.length ? arr.reduce((acc, cur) => acc + cur, 0) / arr.length : 0;

export function WatchedSummary({ watched }) {
  const avgImdbRating = calculateAverage(watched.map((movie) => movie.imdbRating));
  const avgUserRating = calculateAverage(watched.map((movie) => movie.userRating));
  const avgRuntime = calculateAverage(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Películas que has visto</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} películas</span>
        </p>
        <p>
          <span>⭐</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}
