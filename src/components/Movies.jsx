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
          "https://api.themoviedb.org/3/discover/movie?api_key=440811ce73c5e267143f1803ee10a9fa"
        );
        console.log(result)
  
        setMovies(result.data.results);
      };
  
      fetchData();
    }, []);

    const saveToLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
      };
      const removeFromLocalStorage = (key) => {
        localStorage.removeItem(key);
      };
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
  //Favori Alanının Fonksiyonları
    const handleAddFavorite = (movie) => {
      const isAlreadyFavorite = favorites.some((fav) => fav.id === movie.id);
      if (isAlreadyFavorite) {
        alert("This movie is already in your favorites!");
        return;
      }
      const newFavorites = [...favorites, movie];
      setFavorites(newFavorites,);
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
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className="">
       <div className="">
       <form className="grid md:grid-cols-2 lg:grid-cols-5 px-4 md:px-20 gap-20">
        <p className="flex pl-10 justify-center">Search Bar: </p> <input className="border-solid rounded-lg border-4"type="text" onChange={handleSearchChange} />
         <select >
           <option value="">Tüm Türler</option>
           <option value="28">Aksiyon</option>
           <option value="35">Komedi</option>
           <option value="18">Dram</option>
         </select>
         <select >
           <option value="">Tüm Yıllar</option>
           <option value="2023">2023</option>
           <option value="2022">2021</option>
           <option value="2021">2020</option>
         </select>
         <select >
           <option value="">Imdb Puan</option>
           <option value="2023">2023</option>
           <option value="2022">2021</option>
           <option value="2021">2020</option>
         </select>
       </form>
        </div>
        <h1 className="flex font-bold text-2xl justify-center py-2">Movies</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 px-4 pt-4 md:px-0 gap-4">
          {filteredMovies.map((movie) => (
            <div className="bg-white p-16 rounded-lg shadow-xl flex flex-col items-center text-center" key={movie.id}>
            <img className="w-[100px] h-[150px] mb-6" src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`} alt={movie.title} />
              <h3 className="font-semibold text-lg text-black" >{movie.title}</h3>
              <p className="mt-2 text-sm text-gray-700">{movie.release_date}</p>
              <p className="mt-2 text-sm text-gray-700">IMDB: {movie.vote_average}</p>
              <div >
        <button className="px-2" 
        onClick={() => handleAddFavorite(movie)}>Add to favorites</button>
        <button className="px-2" 
        onClick={() => handleRemoveFavorite(movie)}>Remove to favorites</button>
        <button className="px-2" onClick={() => handleAddToRecentlyViewed(movie)}>Add to recently viewed</button>
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
        <h2 className="flex font-bold text-2xl justify-center py-2">Recently Viewed</h2>
        <ul>
          {recentlyViewed.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
</div>
);
};
export default Movies

