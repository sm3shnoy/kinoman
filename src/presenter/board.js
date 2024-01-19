import BoardView from '../view/board';
import MovieView from '../view/movie-card';
import MovieListView from '../view/movie-list';
import MovieListContainerView from '../view/movie-list-container';
import MovieEmptyListView from '../view/movie-empty-list';
import { RenderPosition, render, remove } from '../utils/render';
import SortView from '../view/sort';
import FiltersView from '../view/site-menu';
import ShowMoreButtonView from '../view/show-more-button';
import MoviePopupView from '../view/movie-popup';

const MOVIES_COUNT_PER_STEP = 5;

const body = document.querySelector('body');

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._boardComponent = new BoardView();
    this._movieListContainerComponent = new MovieListContainerView();
    this._movieListComponent = new MovieListView();
    this._noMovieComponent = new MovieEmptyListView();
    this._sortComponent = new SortView();
  }

  init(boardMovies, filters) {
    this._boardMovies = boardMovies.slice();
    this._filters = filters.slice();

    render(this._boardContainer, this._boardComponent, RenderPosition.AFTERBEGIN);
    render(this._boardComponent, this._movieListContainerComponent, RenderPosition.BEFOREEND);
    render(this._movieListContainerComponent, this._movieListComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilters() {
    this._filtersComponent = new FiltersView(this._filters);

    render(this._boardContainer, this._filtersComponent, RenderPosition.AFTERBEGIN);
  }

  _renderMovie(movie) {
    const movieComponent = new MovieView(movie);
    const moviePopupElement = new MoviePopupView(movie);

    const closePopup = () => {
      remove(moviePopupElement);
      body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', onEscKeyDown);
    };

    const openPopup = () => {
      render(this._boardContainer, moviePopupElement, RenderPosition.BEFOREEND);
      body.classList.add('hide-overflow');
      document.addEventListener('keydown', onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup();
      }
    };

    movieComponent.setOpenPopupClickHandler(openPopup);
    moviePopupElement.setClosePopupClickHandler(closePopup);

    render(this._movieListComponent, movieComponent, RenderPosition.BEFOREEND);
  }

  _renderMovies(from, to) {
    this._boardMovies.slice(from, to).forEach((boardMovie) => this._renderMovie(boardMovie));
  }

  _renderMovieList() {
    this._renderMovies(0, Math.min(this._boardMovies.length, MOVIES_COUNT_PER_STEP));

    if (this._boardMovies.length > MOVIES_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderNoMovie() {
    render(this._board, this._noMovieComponent, RenderPosition.AFTERBEGIN);
  }

  _renderShowMoreButton() {
    let renderedMovieCount = MOVIES_COUNT_PER_STEP;
    const showMoreButtonComponent = new ShowMoreButtonView();

    render(this._movieListContainerComponent, showMoreButtonComponent, RenderPosition.BEFOREEND);

    showMoreButtonComponent.setClickHandler(() => {
      this._boardMovies
        .slice(renderedMovieCount, renderedMovieCount + MOVIES_COUNT_PER_STEP)
        .forEach((boardMovie) => this._renderMovie(boardMovie));

      renderedMovieCount += MOVIES_COUNT_PER_STEP;

      if (this._boardMovies.length <= renderedMovieCount) {
        remove(showMoreButtonComponent);
      }
    });
  }

  _renderBoard() {
    if (this._boardMovies.length <= 0) {
      this._renderNoMovie();
      return;
    }

    this._renderSort();
    this._renderFilters();
    this._renderMovieList();
  }
}
