import React, { useState, useEffect } from "react";
import axios from "axios";



const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [recentlyViewed, setRecentlyViewed] = useState(
    JSON.parse(localStorage.getItem("recentlyViewed")) || []
  );
  const [filterMovies, setFilterMovies] = useState([]);

  const [filters, setFilters] = useState({
    title: "",
    year: "",
    vote: "",
    genre: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://api.themoviedb.org/3/discover/movie?api_key=440811ce73c5e267143f1803ee10a9fa"
      );
      console.log(result);

      setMovies(result.data.results);
      setFilterMovies(result.data.results);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filteredMovies = movies;

    if (filters.title !== "") {
      filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.year !== "") {
      filteredMovies = filteredMovies.filter(
        (movie) =>
          movie.release_date &&
          movie.release_date.substring(0, 4) === filters.year
      );
    }

    if (filters.genre !== "") {
      filteredMovies = filteredMovies.filter(
        (movie) =>
          movie.genre_ids && movie.genre_ids.includes(Number(filters.genre))
      );
    }

    if (filters.vote !== "") {
      filteredMovies = filteredMovies.filter(
        (movie) =>
          movie.vote_average && movie.vote_average >= parseFloat(filters.vote)
      );
    }
    setFilterMovies(filteredMovies);
  }, [movies, filters]);

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
  };

  //Favori Alanının Fonksiyonları
  const handleAddFavorite = (movie) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === movie.id);
    if (isAlreadyFavorite) {
      alert("This movie is already in your favorites!");
      return;
    }
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);
    saveToLocalStorage("favorites", newFavorites);
  };

  const handleRemoveFavorite = (movie) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    setFavorites(updatedFavorites);
    removeFromLocalStorage("favorites");
  };
  //son izlenenlerin Fonksiyonları

  const handleAddToRecentlyViewed = (movie) => {
    const isAlreadyRecentlyViewed = recentlyViewed.some(
      (viewed) => viewed.id === movie.id
    );
    if (isAlreadyRecentlyViewed) {
      alert("This movie is already in your recently viewed list!");
      return;
    }
    const newRecentlyViewed = [movie, ...recentlyViewed.slice(0, 4)];
    setRecentlyViewed(newRecentlyViewed);
    saveToLocalStorage("recentlyViewed", newRecentlyViewed);
  };

  //Filtreleme alanı
  function handleFilterChange(event) {
    const { name, value } = event.target;

    setFilters({ ...filters, [name]: value });
  }

  return (
    <div className="">
      <div className="">
        <form className="grid md:grid-cols-2 lg:grid-cols-4 px-20 md:px-30 gap-20">
          <input
            className="border-solid rounded-md border-4 p-2 pl-2"
            type="text"
            name="title"
            placeholder="Search..."
            onChange={handleFilterChange}
          />
          <select name="genre" className="rounded-md focus:overflow-outline-none border-none px-2" onChange={handleFilterChange}>
            <option value="">Genres</option>
            <option value="28">Action</option>
            <option value="35">Comedy</option>
            <option value="18">Drama</option>
          </select>
          <select name="year" className="rounded-md focus:overflow-outline-none border-none px-2" onChange={handleFilterChange}>
            <option value="">Years</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
          <select name="vote" className="rounded-md focus:overflow-outline-none border-none px-2" onChange={handleFilterChange}>
            <option value="">Imdb Vote </option>
            <option value="8">8</option>
            <option value="7">7</option>
            <option value="6">6</option>
            <option value="5">5</option>
          </select>
        </form>
      </div>
      <h1 className="flex font-bold text-2xl justify-center py-2">Movies</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 pt-4 md:px-4 gap-4">
        {filterMovies.map((movie) => (
          <div
            className="bg-white p-2 pt-4 rounded-lg shadow-xl flex flex-col items-center text-center"
            key={movie.id}
          >
            <img
              className="w-[450px] h-[600px] mb-6 rounded-lg shadow-lg"
              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
              alt={movie.title}
            />
            <h3 className="font-semibold text-2xl text-black">{movie.title}</h3>
            <p className="mt-2 text-lg text-gray-700">Release Date: {movie.release_date}</p>
            <p className="mt-2 text-sm text-gray-700 pb-2">
              IMDB: {movie.vote_average}
            </p>
            <div >
              <button className="rounded-lg px-2 bg-green-400  hover:bg-green-300" onClick={() => handleAddFavorite(movie)}>
                Add to favorites 
              </button>
              <button
                className="rounded-lg mx-1 px-2 bg-red-400 hover:bg-red-300"
                onClick={() => handleRemoveFavorite(movie)}
              >
                Remove to favorites
              </button>
              <button
                className="rounded-lg m-2 px-2  bg-gray-400 hover:bg-gray-300"
                onClick={() => handleAddToRecentlyViewed(movie)}
              >
                Add to recently viewed
              </button>
            </div>
          </div>
        ))}
      </div>
      <h1 className="flex font-bold text-2xl justify-center py-2">Favorites</h1>
      <ul className=" px-10 list-disc text-lg">
        {favorites.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
      <h2 className="flex font-bold text-2xl justify-center py-2">
        Recently Viewed
      </h2>
      <ul className=" px-10 list-disc text-lg">
        {recentlyViewed.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};
export default Movies;
