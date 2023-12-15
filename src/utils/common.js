import { POSITION } from './const';

export const render = (container, element, place) => {
  switch (place) {
    case POSITION.BEFOREEND:
      container.insertAdjacentHTML(place, element);
      break;
    case POSITION.AFTERBEGIN:
      container.insertAdjacentHTML(place, element);
      break;
    default:
      throw new Error('Unknown position ' + place);
  }
};
