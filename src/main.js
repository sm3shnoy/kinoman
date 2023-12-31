import { render, RenderPosition, remove } from './utils/render';
import BoardView from './view/board';
import MovieView from './view/movie-card';
import MovieCounterView from './view/movie-count';
import MovieListView from './view/movie-list';
import ProfileView from './view/profile';
import ShowMoreButtonView from './view/show-more-button';
import FiltersView from './view/site-menu';
import SortView from './view/sort';
import { generateMovie } from './mock/movie';
import MoviePopupView from './view/movie-popup';
import { generateFilter } from './mock/filter';
import MovieListContainerView from './view/movie-list-container';
import MovieEmptyListView from './view/movie-empty-list';

const MOVIES_COUNT = 12;
const MOVIES_COUNT_EXTRA = 2;
const MOVIES_COUNT_PER_STEP = 5;

const movies = new Array(MOVIES_COUNT).fill().map(generateMovie);
const filters = generateFilter(movies);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const renderMovie = (movieListElement, movie) => {
  const movieComponent = new MovieView(movie);
  const moviePopupElement = new MoviePopupView(movie);
  const body = document.querySelector('body');

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closePopup();
    }
  };

  const closePopup = () => {
    remove(moviePopupElement);
    body.classList.remove('hide-overflow');
  };

  const openPopup = () => {
    render(siteMainElement, moviePopupElement, RenderPosition.BEFOREEND);
    body.classList.add('hide-overflow');
  };

  movieComponent.setOpenPopupClickHandler(() => {
    openPopup();
    document.addEventListener('keydown', onEscKeyDown);
  });

  moviePopupElement.setClosePopupClickHandler(() => {
    closePopup();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(movieListElement, movieComponent, RenderPosition.BEFOREEND);
};

const renderBoard = (boardContainer, boardMovies) => {
  const board = new BoardView();
  const movieListContainer = new MovieListContainerView();
  const movieList = new MovieListView();

  render(boardContainer, board, RenderPosition.BEFOREEND);
  render(board, new SortView(), RenderPosition.BEFOREEND);
  render(board, movieListContainer, RenderPosition.BEFOREEND);
  render(movieListContainer, movieList, RenderPosition.BEFOREEND);

  if (boardMovies.length <= 0) {
    render(board, new MovieEmptyListView(), RenderPosition.BEFOREEND);
    return;
  }

  boardMovies
    .slice(0, Math.min(movies.length, MOVIES_COUNT_PER_STEP))
    .forEach((boardMovie) => renderMovie(movieList, boardMovie));

  if (boardMovies.length > MOVIES_COUNT_PER_STEP) {
    let renderedMoviesCount = MOVIES_COUNT_PER_STEP;
    const showMoreButton = new ShowMoreButtonView();
    render(movieListContainer, showMoreButton, RenderPosition.BEFOREEND);

    showMoreButton.setShowMoreButtonClickHandler(() => {
      movies
        .slice(renderedMoviesCount, renderedMoviesCount + MOVIES_COUNT_PER_STEP)
        .forEach((boardMovie) => renderMovie(movieList, boardMovie));

      renderedMoviesCount += MOVIES_COUNT_PER_STEP;

      if (boardMovies.length <= renderedMoviesCount) {
        remove(showMoreButton);
      }
    });
  }

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

  render(siteFooterElement, new MovieCounterView(movies.length), RenderPosition.BEFOREEND);
};

render(siteHeaderElement, new ProfileView(), RenderPosition.BEFOREEND);
render(siteMainElement, new FiltersView(filters), RenderPosition.BEFOREEND);

renderBoard(siteMainElement, movies);
