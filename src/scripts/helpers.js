const createElement = (tagName, ...classNames) => {
  const element = document.createElement(tagName);
  element.classList.add(...classNames);

  return element;
};

export default createElement;
