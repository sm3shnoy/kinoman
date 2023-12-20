import { render } from './utils/common';
import { POSITION } from './utils/const';
import { createBoardTemplate } from './view/board';
import { createMovieCardTemplate } from './view/movie-card';
import { createMovieCountTemplate } from './view/movie-count';
import { createMovieListTemplate } from './view/movie-list';
import { createProfileTemplate } from './view/profile';
import { createShowMoreButtonTemplate } from './view/show-more-button';
import { createSiteMenuTemplate } from './view/site-menu';
import { createSortTemplate } from './view/sort';
import { generateMovie } from './mock/movie';
import { createMoviePopupTemplate } from './view/movie-popup';
import { generateFilter } from './mock/filter';

const MOVIES_COUNT = 12;
const MOVIES_COUNT_EXTRA = 2;
const MOVIES_COUNT_PER_STEP = 5;

const movies = new Array(MOVIES_COUNT).fill().map(generateMovie);
const filters = generateFilter(movies);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

render(siteHeaderElement, createProfileTemplate(), POSITION.BEFOREEND);
render(siteMainElement, createSiteMenuTemplate(filters), POSITION.BEFOREEND);
render(siteMainElement, createSortTemplate(), POSITION.BEFOREEND);
render(siteMainElement, createBoardTemplate(), POSITION.BEFOREEND);

const board = document.querySelector('.films');
render(board, createMovieListTemplate(), POSITION.BEFOREEND);
const movieMainList = board.querySelector('.films-list');
const movieMainListContainer = board.querySelector('.films-list__container');

render(siteMainElement, createMoviePopupTemplate(movies[0]), POSITION.BEFOREEND);
for (let i = 0; i < Math.min(movies.length, MOVIES_COUNT_PER_STEP); i++) {
  render(movieMainListContainer, createMovieCardTemplate(movies[i]), POSITION.BEFOREEND);
}

if (movies.length > MOVIES_COUNT_PER_STEP) {
  let renderedMoviesCount = MOVIES_COUNT_PER_STEP;
  render(movieMainList, createShowMoreButtonTemplate(), POSITION.BEFOREEND);

  const showMoreButton = document.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    movies
      .slice(renderedMoviesCount, renderedMoviesCount + MOVIES_COUNT_PER_STEP)
      .forEach((movie) => render(movieMainListContainer, createMovieCardTemplate(movie), POSITION.BEFOREEND));

    renderedMoviesCount += MOVIES_COUNT_PER_STEP;

    if (movies.length <= renderedMoviesCount) {
      showMoreButton.remove();
    }
  });
}

render(board, createMovieListTemplate(true, 'Top rated'), POSITION.BEFOREEND);
render(board, createMovieListTemplate(true, 'Most commented'), POSITION.BEFOREEND);
const movieExtraList = document.querySelectorAll('.films-list--extra');

movieExtraList.forEach((item) => {
  const movieExtraListContainer = item.querySelector('.films-list__container');

  for (let i = 0; i < MOVIES_COUNT_EXTRA; i++) {
    render(movieExtraListContainer, createMovieCardTemplate(movies[i]), POSITION.BEFOREEND);
  }
});

render(siteFooterElement, createMovieCountTemplate(movies.length), POSITION.BEFOREEND);
