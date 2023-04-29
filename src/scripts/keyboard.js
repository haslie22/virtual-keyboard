import createElement from './helpers';

class Keyboard {
  #Key;

  constructor(container, config, language, Key) {
    this.container = container;
    this.config = config;
    this.language = language;

    this.#Key = Key;

    this.keyboard = null;
    this.keys = [];

    this.render();
  }

  render() {
    const keyboard = createElement('div', 'keyboard');
    this.container.append(keyboard);

    this.keyboard = keyboard;
    this.fill();
  }

  fill() {
    this.config.forEach((value) => {
      const key = new this.#Key(this.keyboard, value, () => {});
      this.keys.push(key);
    });
  }
}

export default Keyboard;
