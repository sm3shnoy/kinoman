import { POSITION } from './const';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

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

export const transformDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;

  return {
    hours,
    minutes,
  };
};
