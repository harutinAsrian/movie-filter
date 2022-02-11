import React, { useState, useEffect } from 'react'
import Movie from './components/Movie';
import Filter from './components/Filter';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0)

  const fetchPopular = async () => {
    const data = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=4485c8bf6790b908eabc69e1d54cd779&language=en-US&page=1");
    const movies = await data.json();

    setPopular(movies.results);
    setFiltered(movies.results)
  }

  useEffect(() => {
    fetchPopular();
  }, []);

  return (
    <div className="App">
      <Filter popular={popular} setFiltered={setFiltered} activeGenre={activeGenre} setActiveGenre={setActiveGenre} />
      <motion.div layout className="popular-movies">
        <AnimatePresence>
          {filtered.map(movie => {
            return <Movie movie={movie} key={movie.id} />
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
