import AbstractView from './abstract';

const createMovieEmptyListTemplate = () => `<h2 class="films-list__title">There are no movies in our database</h2>`;

export default class MovieEmptyList extends AbstractView {
  getTemplate() {
    return createMovieEmptyListTemplate();
  }
}
