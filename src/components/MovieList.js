import { useState, useEffect } from "react";
import { useSearchContext, API_ENDPOINT } from "../context/search-context";
import { Link } from "react-router-dom";
import axios from "axios";

const MovieList = () => {
  const { search } = useSearchContext();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMovies = async (url) => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      const data = res.data;
      if (data.Response === "True") {
        setMovies(data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies(
      `${API_ENDPOINT}/?s=${search}&apikey=${process.env.REACT_APP_API_KEY}`
    );
  }, [search]);

  if (loading) {
    return (
      <div class="loader-container d-flex justify-content-center align-items-center">
        <div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

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
                    <article className="movie-list m-1">
                      <img
                        src={
                          poster !== "N/A"
                            ? poster
                            : "https://via.placeholder.com/300x400?text=No+Image+Available"
                        }
                        alt={title}
                        className="card-img-top movie-list"
                      />
                      <div>
                        <h4 className="movie-list">{title}</h4>
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
