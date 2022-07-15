import React, { useState, useContext } from "react";
const API_ENDPOINT = `https://www.omdbapi.com`;

const SearchContext = React.createContext();

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearchContext = () => {
  return useContext(SearchContext);
};

export { SearchProvider, useSearchContext, API_ENDPOINT };
