import AbstractView from './abstract';
import { SortType } from './const';

export const createSortTemplate = () => `<ul class="sort">
<li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
<li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
<li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
</ul>`;

export default class Sort extends AbstractView {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    const sortButtons = this.getElement().querySelectorAll('.sort__button');
    sortButtons.forEach((button) => {
      button.classList.remove('sort__button--active');

      if (evt.target === button) {
        button.classList.add('sort__button--active');
      }
    });

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
