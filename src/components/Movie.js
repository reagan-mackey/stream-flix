import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINT } from "../context/search-context";
import axios from "axios";

const Movie = () => {
  const [movie, setMovie] = useState({});
  const { id } = useParams();

  const fetchMovie = async (url) => {
    try {
      const res = await axios.get(url);
      const data = res.data;
      setMovie(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovie(
      `${API_ENDPOINT}/?i=${id}&apikey=${process.env.REACT_APP_API_KEY}`
    );
  }, [id]);

  const { Poster: poster, Title: title, Plot: plot } = movie;
  return (
    <section className="single-movie">
      <img src={poster !== "N/A" ? poster : ""} alt={title} />
      <div className="movie-info">
        <h1>{title}</h1>
        <p>{plot !== "N/A" ? plot : "No summary is available."}</p>
      </div>
      <Link to="/">Back to Search</Link>
    </section>
  );
};

export default Movie;
