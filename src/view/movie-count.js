import AbstractView from './abstract';

const createMovieCounterTemplate = (moviesNumber) => `<section class="footer__statistics">
<p>${moviesNumber} movies inside</p>
</section>`;

export default class MovieCounter extends AbstractView {
  constructor(moviesNumber) {
    super();

    this._moviesNumber = moviesNumber;
  }

  getTemplate() {
    return createMovieCounterTemplate(this._moviesNumber);
  }
}
