import AbstractView from '../view/abstract';

export const RenderPosition = {
  BEFOREEND: 'beforeend',
  AFTERBEGIN: 'afterbegin',
};

export const render = (container, child, place) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (child instanceof AbstractView) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(place, child);
      break;
    default:
      throw new Error('Unknown position ' + place);
  }
};

export const createElement = (template) => {
  const wrapper = document.createElement('div');

  wrapper.innerHTML = template;

  return wrapper.firstChild;
};

export const remove = (component) => {
  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
};
