import { createElement } from './helpers';

class Heading {
  constructor(container, text) {
    this.container = container;
    this.text = text;

    this.render();
  }

  render() {
    const heading = createElement('div', ...['app__heading', 'heading']);
    this.container.append(heading);

    this.text.split('').forEach((char) => {
      const charElement = createElement('span', 'heading__char');
      charElement.textContent = char;

      heading.append(charElement);
    });
  }
}

export default Heading;
