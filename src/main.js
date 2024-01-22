import { render, RenderPosition } from './utils/render';
import MovieCounterView from './view/movie-count';
import MovieListView from './view/movie-list';
import ProfileView from './view/profile';
import FiltersView from './view/site-menu';
import { generateMovie } from './mock/movie';
import { generateFilter } from './mock/filter';
import MovieListContainerView from './view/movie-list-container';
import BoardPresenter from './presenter/board';

const MOVIES_COUNT = 12;
const MOVIES_COUNT_EXTRA = 2;

const movies = new Array(MOVIES_COUNT).fill().map(generateMovie);
const filters = generateFilter(movies);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const renderBoard = () => {
  const topRatedMovieListContainer = new MovieListContainerView('Top rated', true);
  const mostCommentedMovieListContainer = new MovieListContainerView('Most commented', true);
  const topRatedMovieList = new MovieListView();
  const mostCommentedMovieList = new MovieListView();

  render(board, topRatedMovieListContainer, RenderPosition.BEFOREEND);
  render(board, mostCommentedMovieListContainer, RenderPosition.BEFOREEND);
  render(topRatedMovieListContainer, topRatedMovieList, RenderPosition.BEFOREEND);
  render(mostCommentedMovieListContainer, mostCommentedMovieList, RenderPosition.BEFOREEND);

  for (let i = 0; i < MOVIES_COUNT_EXTRA; i++) {
    renderMovie(topRatedMovieList, movies[i]);
  }

  for (let i = 0; i < MOVIES_COUNT_EXTRA; i++) {
    renderMovie(mostCommentedMovieList, movies[i]);
  }
};

render(siteHeaderElement, new ProfileView(), RenderPosition.BEFOREEND);
render(siteFooterElement, new MovieCounterView(movies.length), RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(siteMainElement);
boardPresenter.init(movies, filters);
