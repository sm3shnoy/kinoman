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

const MOVIES_COUNT = 5;
const MOVIES_COUNT_EXTRA = 2;

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

render(siteHeaderElement, createProfileTemplate(), POSITION.BEFOREEND);
render(siteMainElement, createSiteMenuTemplate(), POSITION.BEFOREEND);
render(siteMainElement, createSortTemplate(), POSITION.BEFOREEND);
render(siteMainElement, createBoardTemplate(), POSITION.BEFOREEND);

const board = document.querySelector('.films');
render(board, createMovieListTemplate(), POSITION.BEFOREEND);
const movieMainList = board.querySelector('.films-list');
const movieMainListContainer = board.querySelector('.films-list__container');

for (let i = 0; i < MOVIES_COUNT; i++) {
  render(movieMainListContainer, createMovieCardTemplate(), POSITION.BEFOREEND);
}

render(movieMainList, createShowMoreButtonTemplate(), POSITION.BEFOREEND);

render(board, createMovieListTemplate(true, 'Top rated'), POSITION.BEFOREEND);
render(board, createMovieListTemplate(true, 'Most commented'), POSITION.BEFOREEND);
const movieExtraList = document.querySelectorAll('.films-list--extra');

movieExtraList.forEach((item) => {
  const movieExtraListContainer = item.querySelector('.films-list__container');

  for (let i = 0; i < MOVIES_COUNT_EXTRA; i++) {
    render(movieExtraListContainer, createMovieCardTemplate(), POSITION.BEFOREEND);
  }
});

render(siteFooterElement, createMovieCountTemplate(), POSITION.BEFOREEND);
