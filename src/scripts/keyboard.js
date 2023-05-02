import { OUTPUT_VALUE } from './data/text-default';

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

    const outputHint = createElement('div', 'output__hint');

    Object.keys(OUTPUT_VALUE).forEach((key) => {
      const outputHintText = createElement('div');
      outputHintText.textContent = `${OUTPUT_VALUE[key]}`;
      outputHint.append(outputHintText);
    });

    this.container.append(keyboardWrapper, outputHint);

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

  refillKeys(capsOn) {
    if (capsOn) {
      this.keys.forEach((keyObj) => {
        const keyCharElement = keyObj.keyChar;
        keyCharElement.textContent = this.config.get(keyObj.keyData.code)[`${this.language}Caps`];
      });
    } else {
      this.keys.forEach((keyObj) => {
        const keyCharElement = keyObj.keyChar;
        keyCharElement.textContent = this.config.get(keyObj.keyData.code)[this.language];
      });
    }
  }
}

export default Keyboard;

// TODO: fix sound and animation on Shift
