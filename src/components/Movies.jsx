
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 px-4 md:px-0 gap-4">
          {filteredMovies.map((movie) => (
            <div className="bg-white p-14 rounded-lg shadow-sm flex flex-col items-center text-center" key={movie.id}>
            <img className="w-[100px] h-[150px] mb-6" src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`} alt={movie.title} />
              <h3 className="font-semibold text-lg text-black" >{movie.title}</h3>
              <p className="mt-2 text-sm text-gray-700">{movie.release_date}</p>
              <p className="mt-2 text-sm text-gray-700">IMDB: {movie.vote_average}</p>
              <div >
        <button className="px-" onClick={() => handleAddFavorite(movie)}>Add to favorites</button>
        <button className="px-2" onClick={() => handleAddToRecentlyViewed(movie)}>Add to recently viewed</button>
        </div>
      </div>
    ))}
 
  </div>
</div>
);
};
export default Movies