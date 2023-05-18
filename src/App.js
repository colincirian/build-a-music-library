import { useEffect, useState } from 'react';
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  let [search, setSearch] = useState('Jimmy Butler');
  let [message, setMessage] = useState('Search for Musix');
  let [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      document.title = `${search} Music`;
      const response = await fetch(`https://itunes.apple.com/search?term=${search}`);
      const resData = await response.json();
      console.log(resData);
      if(resData.results.length) {
        setData(resData.results);
      } else {
        setMessage(`We could find nothing for "${search}"`)
      }
    }
    if (search){
    fetchData();
    }
  }, [search])

  const handleSearch = (e, term) => {
    e.preventDefault();
    setSearch(term);
  }

  return (
    <div className="App">
      <SearchBar handleSearch={handleSearch}/>
      { message }
      <Gallery data={data}/>
    </div>
  );
}

export default App;
