import MovieView from '../view/movie-card';
import MoviePopupView from '../view/movie-popup';
import { RenderPosition, render, remove, replace } from '../utils/render';

const body = document.querySelector('body');

export default class Movie {
  constructor(movieListContainer, changeData) {
    this._movieListContainer = movieListContainer;
    this._changeData = changeData;

    this._movieComponent = null;
    this._moviePopupComponent = null;
    this._isOpen = false;

    this._handleOpenPopupClick = this._handleOpenPopupClick.bind(this);
    this._handleClosePopupClick = this._handleClosePopupClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
  }

  init(movie) {
    this._movie = movie;
    const prevMovieComponent = this._movieComponent;
    const prevMoviePopupComponent = this._moviePopupComponent;

    this._movieComponent = new MovieView(this._movie);
    this._moviePopupComponent = new MoviePopupView(this._movie);

    this._movieComponent.setOpenPopupClickHandler(this._handleOpenPopupClick);
    this._movieComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._movieComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._movieComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._moviePopupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._moviePopupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._moviePopupComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._moviePopupComponent.setClosePopupClickHandler(this._handleClosePopupClick);

    if (prevMovieComponent === null || prevMoviePopupComponent === null) {
      render(this._movieListContainer, this._movieComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._movieListContainer.getElement().contains(prevMovieComponent.getElement())) {
      replace(this._movieComponent, prevMovieComponent);
    }

    if (this._movieListContainer.getElement().contains(prevMoviePopupComponent.getElement())) {
      replace(this._moviePopupComponent, prevMoviePopupComponent);
    }

    remove(prevMovieComponent);
    remove(prevMoviePopupComponent);
  }

  _handleOpenPopupClick() {
    document.addEventListener('keydown', this._handleEscKeyDown);
    body.classList.add('hide-overflow');

    render(this._movieListContainer, this._moviePopupComponent, RenderPosition.BEFOREEND);
  }

  _handleEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._handleClosePopupClick();
    }
  }

  _handleClosePopupClick() {
    this._isOpen = false;
    this._moviePopupComponent.getElement().remove();
    body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._handleEscKeyDown);
  }

  _handleFavoriteClick() {
    this._changeData(Object.assign({}, this._movie, { isFavorite: !this._movie.isFavorite }));
  }

  _handleWatchlistClick() {
    this._changeData(Object.assign({}, this._movie, { isWatchlist: !this._movie.isWatchlist }));
  }

  _handleWatchedClick() {
    this._changeData(Object.assign({}, this._movie, { isWatched: !this._movie.isWatched }));
  }

  _destroy() {
    remove(this._movieComponent);
    remove(this._moviePopupComponent);
  }
}
