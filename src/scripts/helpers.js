const createElement = (tagName, ...classNames) => {
  const element = document.createElement(tagName);
  element.classList.add(...classNames);

  return element;
};

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const getLocalStorage = (key) => {
  localStorage.getItem(key);
};

export { createElement, setLocalStorage, getLocalStorage };
