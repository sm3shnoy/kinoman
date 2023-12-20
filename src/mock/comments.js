import dayjs from 'dayjs';
import { getRandomInteger } from '../utils/common';
import { nanoid } from 'nanoid';

const generateMessage = () => {
  const messages = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
  ];

  const randomIndex = getRandomInteger(0, messages.length - 1);

  return messages[randomIndex];
};

const generateAuthor = () => {
  const authors = ['Alex', 'Elena', 'Yullia', 'Andrew', 'Mattew'];

  const randomIndex = getRandomInteger(0, authors.length - 1);

  return authors[randomIndex];
};

const generateEmotion = () => {
  const emoji = ['angry', 'puke', 'sleeping', 'smile'];

  const randomIndex = getRandomInteger(0, emoji.length - 1);

  return emoji[randomIndex];
};

const generateCommentDate = () => {
  const monthGap = getRandomInteger(-1, -7);

  return dayjs().add(monthGap, 'month').toDate();
};

export const generateComment = () => {
  return {
    id: nanoid(),
    author: generateAuthor(),
    date: generateCommentDate(),
    message: generateMessage(),
    emotion: generateEmotion(),
  };
};

export const staticComments = new Array(5).fill().map(generateComment);
export const getRandomComments = () => {
  const randomIndex = getRandomInteger(0, staticComments.length - 1);

  return staticComments[randomIndex];
};
