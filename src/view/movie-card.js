import dayjs from 'dayjs';
import { transformDuration } from '../utils/movie';
import AbstractView from './abstract';

const createMovieCardTemplate = (movie) => {
  const {
    title,
    rating,
    releaseDate,
    duration,
    genres,
    poster,
    description,
    numberComments,
    isWatchlist,
    isFavorite,
    isWatched,
  } = movie;
  const releaseYear = dayjs(releaseDate).format('YYYY');
  const transformedDuration = transformDuration(duration);
  const displayedHours = transformedDuration.hours ? `${transformedDuration.hours}h` : '';
  const displayedMinutes = transformedDuration.minutes ? `${transformedDuration.minutes}m` : '';

  return `<article class="film-card">
<h3 class="film-card__title">${title}</h3>
<p class="film-card__rating">${rating}</p>
<p class="film-card__info">
  <span class="film-card__year">${releaseYear}</span>
  <span class="film-card__duration">${displayedHours} ${displayedMinutes}</span>
  <span class="film-card__genre">${genres.join(', ')}</span>
</p>
<img src="${poster}" alt="${title}" class="film-card__poster">
<p class="film-card__description">${description}</p>
<a class="film-card__comments">${numberComments} comments</a>
<div class="film-card__controls">
  <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${
    isWatchlist ? 'film-card__controls-item--active' : ''
  }" type="button">Add to watchlist</button>
  <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${
    isWatched ? 'film-card__controls-item--active' : ''
  }" type="button">Mark as watched</button>
  <button class="film-card__controls-item film-card__controls-item--favorite ${
    isFavorite ? 'film-card__controls-item--active' : ''
  }" type="button">Mark as favorite</button>
</div>
</article>`;
};

export default class Movie extends AbstractView {
  constructor(movie) {
    super();

    this._movie = movie;

    this._openCardClickHandler = this._openCardClickHandler.bind(this);
    this._addToFavoriteClickHandler = this._addToFavoriteClickHandler.bind(this);
    this._addToWathclistClickHandler = this._addToWathclistClickHandler.bind(this);
    this._addToWathedClickHandler = this._addToWathedClickHandler.bind(this);
  }

  getTemplate() {
    return createMovieCardTemplate(this._movie);
  }

  _openCardClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setOpenPopupClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._openCardClickHandler);
  }

  _addToFavoriteClickHandler(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement()
      .querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this._addToFavoriteClickHandler);
  }

  _addToWathclistClickHandler(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this._callback.watchlistClick();
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement()
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this._addToWathclistClickHandler);
  }

  _addToWathedClickHandler(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this._callback.watchedClick();
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement()
      .querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this._addToWathedClickHandler);
  }
}
