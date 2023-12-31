import AbstractView from './abstract';

const createMovieListContainerTemplate = (title, extra) => `<section class="films-list ${
  extra ? 'films-list--extra' : ''
}">
${
  title
    ? `<h2 class="films-list__title">${title}</h2>`
    : '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>'
}
</section>`;

export default class MovieListContainer extends AbstractView {
  constructor(title, extra) {
    super();

    this._title = title;
    this._extra = extra;
  }

  getTemplate() {
    return createMovieListContainerTemplate(this._title, this._extra);
  }
}
