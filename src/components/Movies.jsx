
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  
  const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [favorites, setFavorites] = useState(
      JSON.parse(localStorage.getItem("favorites")) || []
    );
    const [recentlyViewed, setRecentlyViewed] = useState(
      JSON.parse(localStorage.getItem("recentlyViewed")) || []
    );
  
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(
          "https://api.themoviedb.org/3/movie/popular?api_key=440811ce73c5e267143f1803ee10a9fa"
        );
        console.log(result)
  
        setMovies(result.data.results);
      };
  
      fetchData();
    }, []);

    const saveToLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
      };
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const handleAddFavorite = (movie) => {
      const newFavorites = [...favorites, movie];
      setFavorites(newFavorites);
      saveToLocalStorage("favorites", newFavorites);
    };
  
    const handleAddToRecentlyViewed = (movie) => {
      const newRecentlyViewed = [movie, ...recentlyViewed.slice(0, 4)];
      setRecentlyViewed(newRecentlyViewed);
      saveToLocalStorage("recentlyViewed", newRecentlyViewed);
    };
  
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div>
        <h2>Favorites</h2>
        <ul>
          {favorites.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
        <h2>Recently Viewed</h2>
        <ul>
          {recentlyViewed.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
        <input type="text" onChange={handleSearchChange} />
        <ul>
          {filteredMovies.map((movie) => (
            <li key={movie.id}>
            <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>{movie.release_date}</p>
              <p>IMDB: {movie.vote_average}</p>
        <button onClick={() => handleAddFavorite(movie)}>
          Add to favorites
        </button>
        <button onClick={() => handleAddToRecentlyViewed(movie)}>
          Add to recently viewed
        </button>
      </li>
    ))}
  </ul>
</div>
);
};
export default Movies