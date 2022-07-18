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
    <div className="movie-list card-group cards-container">
      {movies.length !== 0
        ? movies.Search.map((movie) => {
            const {
              Title: title,
              Year: year,
              Poster: poster,
              imdbID: id,
            } = movie;
            return (
              <div className="col-sm-3 mb-3">
                <div className="movie-list card h-100 text-center m-2">
                  <Link
                    to={`/movies/${id}`}
                    key={id}
                    className="movie-link text-decoration-none"
                  >
                    <article className="movie-list card-info m-1">
                      <img
                        src={poster !== "N/A" ? poster : ""}
                        alt={title}
                        className="card-img-top movie-list"
                      />
                      <div>
                        <h4 className="movie-list card-title">{title}</h4>
                        <p className="movie-list card-text">{year}</p>
                      </div>
                    </article>
                  </Link>
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default MovieList;
