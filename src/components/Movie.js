import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINT } from "../context/search-context";
import axios from "axios";
import Sources from "./Sources";

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchMovie = async (url) => {
    try {
      const res = await axios.get(url);
      const data = res.data;
      setMovie(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovie(
      `${API_ENDPOINT}/?i=${id}&apikey=${process.env.REACT_APP_API_KEY}`
    );
  }, [id]);

  if (loading) {
    return (
      <div class="loader-container d-flex justify-content-center align-items-center">
        <div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const { Poster: poster, Title: title, Plot: plot } = movie;
  return (
    <>
      <nav class="navbar">
        <Link to="/" className="text-decoration-none mx-2">
          Back to Search
        </Link>
      </nav>
      <section className="container">
        <div className="row align-items-center mt-5">
          <div className="text-center col">
            <img
              src={poster !== "N/A" ? poster : ""}
              alt={title}
              className="single-movie-img mb-3"
            />
          </div>
          <div className="card w-50 col mb-5">
            <div className="card-body">
              <h1 className="card-title text-center">{title}</h1>
              <p className="card-text mb-4">
                {plot !== "N/A" ? plot : "No summary is available."}
              </p>
              <Sources />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Movie;
