import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import { getRandomInteger } from '../utils/common';
import { getRandomComments } from './comments';

const generateTitle = () => {
  const titles = [
    'The Dance of Life',
    'Sagebrush Trail',
    'The Man with the Golden Arm',
    'Santa Claus Conquers the Martians',
    'Popeye the Sailor Meets Sindbad the Sailor',
    'The Great Flamarion',
    'Made for Each Other',
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generatePoster = (title) => `./images/posters/${title.toLowerCase().split(' ').join('-')}.jpg`;

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generateGenre = () => {
  const genres = ['Drama', 'Film-Noir', 'Mystery', 'Western', 'Musical', 'Comedy', 'Cartoon', 'Mystery'];

  const randomIndex = getRandomInteger(0, genres.length - 1);

  return genres[randomIndex];
};

const generateDirector = () => {
  const directors = [`Tom Ford`, `John Cromwell`, `Jennifer Aniston`, `Thomas Vinterberg`, `Taylor Dooley`];

  const randomIndex = getRandomInteger(0, directors.length - 1);

  return directors[randomIndex];
};

const generateWritter = () => {
  const writters = [`Takeshi Kitano`, `Werner Herzog`, `Miles Teller`, `Diane Lane`, `Peter Stormare`, `Jack Black`];

  const randomIndex = getRandomInteger(0, writters.length - 1);

  return writters[randomIndex];
};

const generateActor = () => {
  const actors = [
    `Morgan Freeman`,
    `Matilda De Angelis`,
    `Kevin Hart`,
    `Amanda Collin`,
    `Ji Chang-wook`,
    `Neslihan Atagül`,
    `Mark Dacascos`,
    `Tim Robbins`,
  ];

  const randomIndex = getRandomInteger(0, actors.length - 1);

  return actors[randomIndex];
};

const generateCountry = () => {
  const countries = [`Finland`, `USA`, `France`, `China`, `USSR`, `England`, `Germany`];

  const randomIndex = getRandomInteger(0, countries.length - 1);

  return countries[randomIndex];
};

const generateRating = () => {
  const minValue = 0;
  const maxValue = 10;

  const randomRating = getRandomInteger(minValue, maxValue);

  return randomRating;
};

const generateReleaseDate = () => {
  const yearsGap = getRandomInteger(-40, -80);

  return dayjs().add(yearsGap, 'year').toDate();
};

const generateDuration = () => {
  const minValue = 30;
  const maxValue = 120;

  const randomDuration = getRandomInteger(minValue, maxValue);

  return randomDuration;
};

const generateAgeRating = () => {
  const minValue = 0;
  const maxValue = 18;

  const randomAgeRating = getRandomInteger(minValue, maxValue);

  return randomAgeRating;
};

export const generateMovie = () => {
  const title = generateTitle();
  const commentsIds = new Array(getRandomInteger(0, 5))
    .fill()
    .map(getRandomComments)
    .map((item) => item.id);

  return {
    id: nanoid(),
    poster: generatePoster(title),
    title: title,
    originalTitle: title,
    rating: generateRating(),
    director: generateDirector(),
    writters: new Array(getRandomInteger(1, 3)).fill().map(generateWritter),
    actors: new Array(getRandomInteger(1, 5)).fill().map(generateActor),
    releaseDate: generateReleaseDate(),
    duration: generateDuration(), // 1h 40m
    country: generateCountry(),
    genres: new Array(getRandomInteger(1, 3)).fill().map(generateGenre),
    description: new Array(getRandomInteger(1, 5)).fill().map(generateDescription).join(' '), // Если описание фильма больше 140 символов, то в карточке отображается 139 символов описания и знак многоточие (…).
    ageRating: generateAgeRating(),
    numberComments: commentsIds.length,
    comments: commentsIds,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
  };
};
