import AbstractView from './abstract';

const createFilterItemTemplate = (filter, isActive) => {
  const { name, count } = filter;
  const numberMovies = count ? `<span class="main-navigation__item-count">${count}</span>` : '';

  return `<a href="#" class="main-navigation__item ${
    isActive ? 'main-navigation__item--active' : ''
  }">${name} ${numberMovies}</a>`;
};

const createSiteMenuTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 2))
    .join('');

  return `<nav class="main-navigation">
<div class="main-navigation__items">
  ${filterItemsTemplate}
</div>
<a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters);
  }
}
