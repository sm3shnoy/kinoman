import AbstractView from './abstract';

const createMovieListTemplate = () => `<div class="films-list__container"></div>`;

export default class MovieList extends AbstractView {
  getTemplate() {
    return createMovieListTemplate();
  }
}
