import { createElement } from '../utils/common';

const createMovieListTemplate = () => `<div class="films-list__container"></div>`;

export default class MovieList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMovieListTemplate();
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
