import {useEffect, useState} from 'react';
import MovieList from './components/MovieList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourities from './components/AddFavourities';
import RemoveFavourites from './components/RemoveFavourites';

function App() {
  const [movies, setMovies] = useState([]);
  const [favourties, setFavourties] = useState([]);
  const [searchValue, setSearchValue] = useState('')

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=803bd1f2`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.Search) {
      setMovies(responseJson.Search);
    }
   
  };

  useEffect(() => {
    getMovieRequest(searchValue)
  }, [searchValue]);

  const addFavourtineMovie = (movie) => {
    const newFavourteList = [...favourties, movie];
    setFavourties(newFavourteList);

  }
  return (
    <div className="container-fluid movie-app">
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList 
        movies={movies} 
        handleFavouritesClick={addFavourtineMovie} 
        favouriteComponent={AddFavourities}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Favourites" />
        </div>
        <div className="row">
        <MovieList 
        movies={favourties} 
        handleFavouritesClick={addFavourtineMovie} 
        favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
};

export default App;
