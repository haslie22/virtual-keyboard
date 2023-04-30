import { createElement } from './helpers';

import defauldSound from '../assets/sounds/default.mp3';
import spaceSound from '../assets/sounds/space.mp3';

class Keyboard {
  static #defaultAudio = new Audio(defauldSound);

  static #spaceAudio = new Audio(spaceSound);

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
      const audio = (keyCode === 'Space' ? Keyboard.#spaceAudio : Keyboard.#defaultAudio);
      const key = new this.#Key(
        this.keyboard,
        keyData,
        this.styleConfig[keyCode] || this.styleConfig.default,
        this.language,
        audio,
      );
      this.keys.push(key);
    });
  }
}

export default Keyboard;
