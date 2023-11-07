import './styles/index.scss';

import React from 'react';
import { MainPage } from '../pages/MainPage/MainPage';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import MovieDetails from '../components/MovieDetails/MovieDetails';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainPage />}>
      <Route path="tmdb-searcher/:id" element={<MovieDetails />}></Route>
    </Route>
  )
);

export class App extends React.Component {
  render() {
    return <RouterProvider router={router} />;
  }
}

export default App;
