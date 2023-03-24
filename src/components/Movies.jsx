import React, { useState, useEffect } from "react";
import axios from "axios";
import {AiFillHeart} from "react-icons/ai" 
import {AiOutlineHeart} from "react-icons/ai" 


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
        <form className="grid md:grid-cols-2 lg:grid-cols-5 px-4 md:px-20 gap-20">
          <p className="flex pl-10 justify-center">Search Bar: </p>{" "}
          <input
            className="border-solid rounded-lg border-4"
            type="text"
            name="title"
            onChange={handleFilterChange}
          />
          <select name="genre" onChange={handleFilterChange}>
            <option value="">Genres</option>
            <option value="28">Action</option>
            <option value="35">Comedy</option>
            <option value="18">Drama</option>
          </select>
          <select name="year" onChange={handleFilterChange}>
            <option value="">Years</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
          <select name="vote" onChange={handleFilterChange}>
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
            className="bg-white p-16 rounded-lg shadow-xl flex flex-col items-center text-center"
            key={movie.id}
          >
            <img
              className="w-[100px] h-[150px] mb-6"
              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
              alt={movie.title}
            />
            <h3 className="font-semibold text-lg text-black">{movie.title}</h3>
            <p className="mt-2 text-lg text-gray-700">Release Date: {movie.release_date}</p>
            <p className="mt-2 text-sm text-gray-700">
              IMDB: {movie.vote_average}
            </p>
            <div>
              <button className="" onClick={() => handleAddFavorite(movie)}>
                {/* <AiFillHeart className=""/> */}
                Add to favorites 
              </button>
              <button
                className=" px-2"
                onClick={() => handleRemoveFavorite(movie)}
              >
                {/* <AiOutlineHeart/> */}
                Remove to favorites
              </button>
              <button
                className="px-2"
                onClick={() => handleAddToRecentlyViewed(movie)}
              >
                Add to recently viewed
              </button>
            </div>
          </div>
        ))}
      </div>
      <h1 className="flex font-bold text-2xl justify-center py-2">Favorites</h1>
      <ul>
        {favorites.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
      <h2 className="flex font-bold text-2xl justify-center py-2">
        Recently Viewed
      </h2>
      <ul>
        {recentlyViewed.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};
export default Movies;
