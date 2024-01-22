import dayjs from 'dayjs';

export const transformDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;

  return {
    hours,
    minutes,
  };
};

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortMovieByDate = (movieA, movieB) => {
  const weight = getWeightForNullDate(movieA.releaseDate, movieB.releaseDate);

  if (weight !== null) {
    return weight;
  }

  return dayjs(movieB.releaseDate).diff(dayjs(movieA.releaseDate));
};

export const sortMovieByRating = (movieA, movieB) => {
  return movieB.rating - movieA.rating;
};
