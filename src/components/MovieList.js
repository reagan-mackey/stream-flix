import { useState, useEffect } from "react";
import { useSearchContext, API_ENDPOINT } from "../context/search-context";
import { Link } from "react-router-dom";
import axios from "axios";

const MovieList = () => {
  const { search } = useSearchContext();
  const [movies, setMovies] = useState([]);

  const getMovies = async (url) => {
    try {
      const res = await axios.get(url);
      const data = res.data;
      if (data.Response === "True") {
        setMovies(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies(
      `${API_ENDPOINT}/?s=${search}&apikey=${process.env.REACT_APP_API_KEY}`
    );
  }, [search]);

  return (
    <div className="movie-list">
      {movies.length !== 0
        ? movies.Search.map((movie) => {
            const {
              Title: title,
              Year: year,
              Poster: poster,
              imdbID: id,
            } = movie;
            return (
              <Link to={`/movies/${id}`} key={id}>
                <article className="movie-card">
                  <img src={poster !== "N/A" ? poster : ""} alt={title} />
                  <h4>{title}</h4>
                  <p>{year}</p>
                </article>
              </Link>
            );
          })
        : ""}
    </div>
  );
};

export default MovieList;
