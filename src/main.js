import { render } from './utils/common';
import { RenderPosition } from './utils/const';
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

render(siteHeaderElement, new ProfileView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FiltersView(filters).getElement(), RenderPosition.BEFOREEND);

if (movies.length <= 0) {
  render(siteMainElement, new MovieEmptyListView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);
}

const board = new BoardView();
const movieListContainer = new MovieListContainerView();
const movieList = new MovieListView();

render(siteMainElement, board.getElement(), RenderPosition.BEFOREEND);
render(board.getElement(), movieListContainer.getElement(), RenderPosition.BEFOREEND);
render(movieListContainer.getElement(), movieList.getElement(), RenderPosition.BEFOREEND);

const renderMovie = (movieListElement, movie) => {
  const movieComponent = new MovieView(movie);

  const openPopup = () => {
    const moviePopupElement = new MoviePopupView(movie).getElement();
    const moviePopupCloseButton = moviePopupElement.querySelector('.film-details__close-btn');
    const body = document.querySelector('body');

    const closePopup = () => {
      moviePopupElement.remove();
      body.classList.remove('hide-overflow');
      moviePopupCloseButton.removeEventListener('click', closePopup);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    siteMainElement.append(moviePopupElement);
    body.classList.add('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);
    moviePopupCloseButton.addEventListener('click', closePopup);
  };

  render(movieListElement, movieComponent.getElement(), RenderPosition.BEFOREEND);

  movieComponent.getElement().addEventListener('click', openPopup);
};

for (let i = 0; i < Math.min(movies.length, MOVIES_COUNT_PER_STEP); i++) {
  renderMovie(movieList.getElement(), movies[i]);
}

if (movies.length > MOVIES_COUNT_PER_STEP) {
  let renderedMoviesCount = MOVIES_COUNT_PER_STEP;
  const showMoreButton = new ShowMoreButtonView();
  render(movieListContainer.getElement(), showMoreButton.getElement(), RenderPosition.BEFOREEND);

  showMoreButton.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();

    movies
      .slice(renderedMoviesCount, renderedMoviesCount + MOVIES_COUNT_PER_STEP)
      .forEach((movie) => renderMovie(movieList.getElement(), movie));

    renderedMoviesCount += MOVIES_COUNT_PER_STEP;

    if (movies.length <= renderedMoviesCount) {
      showMoreButton.getElement().remove();
    }
  });
}
if (movies.length > 0) {
  render(siteMainElement, new MovieEmptyListView().getElement(), RenderPosition.BEFOREEND);

  const topRatedMovieListContainer = new MovieListContainerView('Top rated', true);
  const mostCommentedMovieListContainer = new MovieListContainerView('Most commented', true);
  const topRatedMovieList = new MovieListView();
  const mostCommentedMovieList = new MovieListView();

  render(board.getElement(), topRatedMovieListContainer.getElement(), RenderPosition.BEFOREEND);
  render(board.getElement(), mostCommentedMovieListContainer.getElement(), RenderPosition.BEFOREEND);
  render(topRatedMovieListContainer.getElement(), topRatedMovieList.getElement(), RenderPosition.BEFOREEND);
  render(mostCommentedMovieListContainer.getElement(), mostCommentedMovieList.getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < MOVIES_COUNT_EXTRA; i++) {
    renderMovie(topRatedMovieList.getElement(), movies[i]);
  }

  for (let i = 0; i < MOVIES_COUNT_EXTRA; i++) {
    renderMovie(mostCommentedMovieList.getElement(), movies[i]);
  }
}

render(siteFooterElement, new MovieCounterView(movies.length).getElement(), RenderPosition.BEFOREEND);
