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
import { SortType } from '../view/const';
import { sortMovieByDate, sortMovieByRating } from '../utils/movie';

const MOVIES_COUNT_PER_STEP = 5;

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedMovieCount = MOVIES_COUNT_PER_STEP;
    this._moviePresenter = {};
    this._changeData = null;
    this._currentSortType = SortType.DEFAULT;

    this._boardComponent = new BoardView();
    this._movieListContainerComponent = new MovieListContainerView();
    this._movieListComponent = new MovieListView();
    this._noMovieComponent = new MovieEmptyListView();
    this._sortComponent = new SortView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleMovieChange = this._handleMovieChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(boardMovies, filters) {
    this._boardMovies = boardMovies.slice();
    this._filters = filters.slice();
    this._sourcedBoardMovies = this._boardMovies.slice();

    render(this._boardContainer, this._boardComponent, RenderPosition.AFTERBEGIN);
    render(this._boardComponent, this._movieListContainerComponent, RenderPosition.BEFOREEND);
    render(this._movieListContainerComponent, this._movieListComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _sortMovies(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._boardMovies.sort(sortMovieByDate);
        break;
      case SortType.RATING:
        this._boardMovies.sort(sortMovieByRating);
        break;
      default:
        this._boardMovies = this._sourcedBoardMovies.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortMovies(sortType);
    this._clearMovieList();
    this._renderMovieList();
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilters() {
    this._filtersComponent = new FiltersView(this._filters);

    render(this._boardContainer, this._filtersComponent, RenderPosition.AFTERBEGIN);
  }

  _handleModeChange() {
    Object.values(this._moviePresenter).forEach((presenter) => presenter.resetView());
  }

  _handleMovieChange(updatedMovie) {
    this._boardMovies = updateItem(this._boardMovies, updatedMovie);
    this._moviePresenter[updatedMovie.id].init(updatedMovie);
  }

  _renderMovie(movie) {
    const moviePresenter = new MoviePresenter(
      this._movieListComponent,
      this._handleMovieChange,
      this._handleModeChange
    );
    moviePresenter.init(movie);
    this._moviePresenter[movie.id] = moviePresenter;
  }

  _clearMovieList() {
    Object.values(this._moviePresenter).forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};
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
