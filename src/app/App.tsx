import './styles/index.scss';

import React from 'react';
import { MainPage } from '../pages/MainPage/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MovieDetails from '../components/MovieDetails/MovieDetails';

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="tmdb-searcher/:id" element={<MovieDetails />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
