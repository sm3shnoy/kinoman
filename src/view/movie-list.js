export const createMovieListTemplate = (extra, title) => `
<section class="films-list ${extra ? 'films-list--extra' : ''}">
  ${
    title
      ? `<h2 class="films-list__title">${title}</h2>`
      : '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>'
  }
  <div class="films-list__container"></div>
  </section>
`;
