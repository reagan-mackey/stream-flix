import { useSearchContext } from "../context/search-context";

const SearchForm = () => {
  const { search, setSearch } = useSearchContext();

  return (
    <div className="header">
      <h1 className="app-title">search for movies</h1>
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchForm;
