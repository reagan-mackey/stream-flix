import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const SOURCES_API_ENDPOINT = `https://api.watchmode.com/v1`;

const Sources = () => {
  const { id } = useParams();
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSources = async (url) => {
    try {
      const res = await axios.get(url);
      const data = res.data;
      let unique = [
        ...new Set(
          data.map((obj) => {
            return obj.name;
          })
        ),
      ];
      setSources(unique);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSources(
      `${SOURCES_API_ENDPOINT}/title/${id}/sources/?apiKey=${process.env.REACT_APP_SOURCES_API_KEY}`
    );
  }, [id]);

  if (loading) {
    return (
      <div class="loader-container-sources d-flex justify-content-center align-items-center">
        <div class="spinner-border loader-sources text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <ul className="list-inline text-center">
      <div className="card-title">
        <h2>Where to Stream</h2>
      </div>
      <div className="card-text">
        {sources.length !== 0 ? (
          sources.map((source) => {
            return <li className="list-inline-item p-1">{source}</li>;
          })
        ) : (
          <p>No streaming sources are available.</p>
        )}
      </div>
    </ul>
  );
};

export default Sources;
