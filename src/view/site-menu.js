const createFilterItemTemplate = (filter, isActive) => {
  const { name, count } = filter;
  const numberMovies = count ? `<span class="main-navigation__item-count">${count}</span>` : '';

  return `<a href="${filter}" class="main-navigation__item ${
    isActive ? 'main-navigation__item--active' : ''
  }">${name} ${numberMovies}</a>`;
};

export const createSiteMenuTemplate = (filterItems) => {
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
