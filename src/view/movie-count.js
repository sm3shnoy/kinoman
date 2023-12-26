import { createElement } from '../utils/common';

const createMovieCounterTemplate = (moviesNumber) => `<section class="footer__statistics">
<p>${moviesNumber} movies inside</p>
</section>`;

export default class MovieCounter {
  constructor(moviesNumber) {
    this._element = null;
    this._moviesNumber = moviesNumber;
  }

  getTemplate() {
    return createMovieCounterTemplate(this._moviesNumber);
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
