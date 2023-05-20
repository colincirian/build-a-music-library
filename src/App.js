import { useState, useRef } from "react";
import Gallery from "./components/Gallery";
import SearchBar from "./components/SearchBar";
import { DataContext } from "./components/contexts/DataContext";
import { SearchContext } from "./components/contexts/SearchContext";
import "./App.css";

function App() {
  let [message, setMessage] = useState("Search for Musix");
  let [data, setData] = useState([]);
  let searchInput = useRef('');

  const handleSearch = (e, search) => {
    e.preventDefault();
    const fetchData = async () => {
      try {
        document.title = `${search} Music`;
        const response = await fetch(
          `https://itunes.apple.com/search?term=${search}`
        );
        const resData = await response.json();
        console.log(resData);
        if (resData.results.length) {
          setData(resData.results);
          setMessage("");
        } else {
          setMessage(`We could find nothing for "${search}"`);
        }
      } catch (e) {
        console.log(e);
      }
    };
    if (search) {
      fetchData();
    }
  };

  return (
    <div className="App">
      <SearchContext.Provider
        value={{
          term: searchInput,
          handleSearch: handleSearch,
        }}
      >
        <SearchBar />
      </SearchContext.Provider>
      {message}
      <DataContext.Provider value={data}>
        <Gallery />
      </DataContext.Provider>
    </div>
  );
}

export default App;
