import createElement from './helpers';

class Keyboard {
  #Key;

  constructor(container, config, styleConfig, language, Key) {
    this.container = container;
    this.config = config;
    this.styleConfig = styleConfig;
    this.language = language;

    this.#Key = Key;

    this.keyboard = null;
    this.keys = [];

    this.render();
  }

  render() {
    const keyboardWrapper = createElement('div', 'keyboard-wrapper');
    const keyboard = createElement('div', 'keyboard');
    keyboardWrapper.append(keyboard);
    this.container.append(keyboardWrapper);

    this.keyboard = keyboard;
    this.fill();
  }

  fill() {
    this.config.forEach((keyData, keyCode) => {
      const key = new this.#Key(
        this.keyboard,
        keyData,
        this.styleConfig[keyCode] || this.styleConfig.default,
        () => {},
      );
      this.keys.push(key);
    });
  }
}

export default Keyboard;
