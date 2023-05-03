const createElement = (tagName, ...classNames) => {
  const element = document.createElement(tagName);
  element.classList.add(...classNames);

  return element;
};

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const detectShiftOnClick = (event) => {
  let isShift = false;
  if (event.target.dataset.keyCode) {
    if (event.target.dataset.keyCode === 'ShiftRight') {
      isShift = true;
    } else if (event.target.dataset.keyCode === 'ShiftLeft') {
      isShift = true;
    } else {
      isShift = false;
    }
  } else if (event.target.closest('.key') && event.target.closest('.key').dataset.keyCode) {
    if (event.target.closest('.key').dataset.keyCode === 'ShiftRight') {
      isShift = true;
    } else if (event.target.closest('.key').dataset.keyCode === 'ShiftLeft') {
      isShift = true;
    } else {
      isShift = false;
    }
  } else {
    isShift = false;
  }
  return isShift;
};

const detectCapsLockOnClick = (event) => {
  let isCapsLock = false;
  if (event.target.dataset.keyCode) {
    if (event.target.dataset.keyCode === 'CapsLock') {
      isCapsLock = true;
    } else {
      isCapsLock = false;
    }
  } else if (event.target.closest('.key') && event.target.closest('.key').dataset.keyCode) {
    if (event.target.closest('.key').dataset.keyCode === 'CapsLock') {
      isCapsLock = true;
    } else {
      isCapsLock = false;
    }
  } else {
    isCapsLock = false;
  }
  return isCapsLock;
};

const detectPlatform = () => {
  let OS = null;
  if (navigator.userAgent.indexOf('Win') !== -1) OS = 'Windows';
  if (navigator.userAgent.indexOf('Mac') !== -1) OS = 'MacOS';
  if (navigator.userAgent.indexOf('X11') !== -1) OS = 'UNIX';
  if (navigator.userAgent.indexOf('Linux') !== -1) OS = 'Linux';

  return OS;
};

const getLocalStorage = (key) => localStorage.getItem(key);

export {
  createElement,
  setLocalStorage,
  getLocalStorage,
  detectShiftOnClick,
  detectCapsLockOnClick,
  detectPlatform,
};
