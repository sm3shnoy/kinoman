import BoardView from '../view/board';
import MovieListView from '../view/movie-list';
import MovieListContainerView from '../view/movie-list-container';
import MovieEmptyListView from '../view/movie-empty-list';
import { RenderPosition, render, remove } from '../utils/render';
import SortView from '../view/sort';
import FiltersView from '../view/site-menu';
import ShowMoreButtonView from '../view/show-more-button';
import { updateItem } from '../utils/common';
import MoviePresenter from './movie';

const MOVIES_COUNT_PER_STEP = 5;

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedMovieCount = MOVIES_COUNT_PER_STEP;
    this._moviePresenter = {};
    this._changeData = null;

    this._boardComponent = new BoardView();
    this._movieListContainerComponent = new MovieListContainerView();
    this._movieListComponent = new MovieListView();
    this._noMovieComponent = new MovieEmptyListView();
    this._sortComponent = new SortView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleMovieChange = this._handleMovieChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
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

  _handleMovieChange(updatedMovie) {
    this._boardMovies = updateItem(this._boardMovies, updatedMovie);
    this._moviePresenter[updatedMovie.id].init(updatedMovie);
  }

  _renderMovie(movie) {
    const moviePresenter = new MoviePresenter(this._movieListComponent, this._handleMovieChange);
    moviePresenter.init(movie);
    this._moviePresenter[movie.id] = moviePresenter;
  }

  _clearMovieList() {
    Object.values(this._movies).forEach((movie) => remove(movie));
    this._movies = {};
    this._renderedMovieCount = MOVIES_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
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

  _handleShowMoreButtonClick() {
    this._boardMovies
      .slice(this._renderedMovieCount, this._renderedMovieCount + MOVIES_COUNT_PER_STEP)
      .forEach((boardMovie) => this._renderMovie(boardMovie));

    this._renderedMovieCount += MOVIES_COUNT_PER_STEP;

    if (this._boardMovies.length <= this._renderedMovieCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._movieListContainerComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
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
