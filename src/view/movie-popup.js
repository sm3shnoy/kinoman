import dayjs from 'dayjs';
import { transformDuration, createElement } from '../utils/common';
import { staticComments } from '../mock/comments';

const BLANK_MOVIE = {
  releaseDate: null,
  duration: null,
  title: '',
  originalTitle: '',
  rating: 0,
  ageRating: 0,
  director: '',
  writters: [],
  actors: [],
  country: '',
  genres: [],
  poster: '',
  description: '',
};

const createGenresTemplate = (genres) => {
  const genreElements = genres.map((item) => `<span class="film-details__genre">${item}</span>`).join('');

  return `<tr class="film-details__row">
  <td class="film-details__term">Genres</td>
  <td class="film-details__cell">
    ${genreElements}
  </tr>`;
};

const createControlsTemplate = (isFavorite, isWatched, isWatchlist) => {
  return `<section class="film-details__controls">
  <button type="button" class="film-details__control-button film-details__control-button--watchlist ${
    isWatchlist ? 'film-details__control-button--active' : ''
  }" id="watchlist" name="watchlist">Add to watchlist</button>
  <button type="button" class="film-details__control-button film-details__control-button--watched ${
    isWatched ? 'film-details__control-button--active' : ''
  }" id="watched" name="watched">Already watched</button>
  <button type="button" class="film-details__control-button film-details__control-button--favorite ${
    isFavorite ? 'film-details__control-button--active' : ''
  }" id="favorite" name="favorite">Add to favorites</button>
</section>`;
};

const createCommentTemplate = (author, emotion, message, date) => {
  const formattedDate = dayjs(date).format('YYYY/MM/DD HH:MM');

  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
  </span>
  <div>
    <p class="film-details__comment-text">${message}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${formattedDate}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
};

const createCommentListTemplate = (comments) => {
  const commentElements = comments
    .map((item) => {
      const comment = staticComments.find(({ id }) => id === item);

      const { author, emotion, message, date } = comment;

      return createCommentTemplate(author, emotion, message, date);
    })
    .join('');

  return `<ul class="film-details__comments-list">
    ${commentElements}
  </ul>`;
};

const createInfoTemplate = (movie) => {
  const {
    releaseDate,
    duration,
    title,
    originalTitle,
    rating,
    ageRating,
    director,
    writters,
    actors,
    country,
    genres,
    poster,
    description,
  } = movie;

  const humanizeReleaseDate = dayjs(releaseDate).format('D MMMM YYYY');
  const transformedDuration = transformDuration(duration);
  const displayedHours = transformedDuration.hours ? `${transformedDuration.hours}h` : '';
  const displayedMinutes = transformedDuration.minutes ? `${transformedDuration.minutes}m` : '';

  return `<div class="film-details__info-wrap">
  <div class="film-details__poster">
    <img class="film-details__poster-img" src="${poster}" alt="${title}">

    <p class="film-details__age">${ageRating}+</p>
  </div>

  <div class="film-details__info">
    <div class="film-details__info-head">
      <div class="film-details__title-wrap">
        <h3 class="film-details__title">${title}</h3>
        <p class="film-details__title-original">Original: ${originalTitle}</p>
      </div>

      <div class="film-details__rating">
        <p class="film-details__total-rating">${rating}</p>
      </div>
    </div>

    <table class="film-details__table">
      <tr class="film-details__row">
        <td class="film-details__term">Director</td>
        <td class="film-details__cell">${director}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Writers</td>
        <td class="film-details__cell">${writters}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Actors</td>
        <td class="film-details__cell">${actors}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Release Date</td>
        <td class="film-details__cell">${humanizeReleaseDate}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Runtime</td>
        <td class="film-details__cell">${displayedHours} ${displayedMinutes}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Country</td>
        <td class="film-details__cell">${country}</td>
      </tr>
      ${createGenresTemplate(genres)}
    </table>

    <p class="film-details__film-description">
      ${description}
    </p>
  </div>
</div>`;
};

const createNewCommentTemplate = () => {
  return `<div class="film-details__new-comment">
  <div class="film-details__add-emoji-label"></div>

  <label class="film-details__comment-label">
    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
  </label>

  <div class="film-details__emoji-list">
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
    <label class="film-details__emoji-label" for="emoji-smile">
      <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
    <label class="film-details__emoji-label" for="emoji-sleeping">
      <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
    <label class="film-details__emoji-label" for="emoji-puke">
      <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
    <label class="film-details__emoji-label" for="emoji-angry">
      <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
    </label>
  </div>
</div>`;
};

const createMoviePopupTemplate = (movie) => {
  const { numberComments, comments, isWatchlist, isFavorite, isWatched } = movie;

  return `<section class="film-details">
<form class="film-details__inner" action="" method="get">
  <div class="film-details__top-container">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    ${createInfoTemplate(movie)}

    ${createControlsTemplate(isWatchlist, isWatched, isFavorite)}
  </div>

  <div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${numberComments}</span></h3>

      ${createCommentListTemplate(comments)}

      ${createNewCommentTemplate()}
    </section>
  </div>
</form>
</section>`;
};

export default class MoviePopup {
  constructor(movie = BLANK_MOVIE) {
    this._element = null;
    this._movie = movie;
  }

  getTemplate() {
    return createMoviePopupTemplate(this._movie);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
