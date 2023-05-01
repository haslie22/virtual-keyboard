import { APP_NAME } from './data/text-default';

import { createElement, setLocalStorage } from './helpers';

class App {
  #title;

  #keyboard;

  #output;

  #Key;

  constructor(
    container,
    config,
    specialKeys,
    styleConfig,
    language,
    Keyboard,
    Output,
    Key,
    Heading,
  ) {
    this.config = config;
    this.specialKeys = specialKeys;
    this.styleConfig = styleConfig;
    this.language = language;

    this.app = createElement('div', 'app');
    container.append(this.app);
    this.#title = new Heading(this.app, APP_NAME);
    this.#output = new Output(this.app);
    this.#keyboard = new Keyboard(this.app, this.config, this.styleConfig, this.language, Key);

    this.currentKeys = [];
  }

  addListeners() {
    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      this.#output.output.focus();
      this.triggerPressEvent(event);
    });

    document.addEventListener('keyup', (event) => {
      if (this.currentKeys.length) {
        this.handleUnpressedKey(event);
      }
    });

    this.#keyboard.keyboard.addEventListener('mousedown', (event) => {
      event.preventDefault();
      this.#output.output.focus();
    });

    this.#keyboard.keyboard.addEventListener('mouseup', (event) => {
      if (this.currentKeys.length) {
        this.handleUnpressedKey(event);
      }
    });

    this.app.addEventListener('keyClicked', (event) => {
      this.handleActiveKeys(event);
    });

    this.app.addEventListener('keyPressed', (event) => {
      event.preventDefault();

      this.handleActiveKeys(event);
    });
  }

  triggerPressEvent(event) {
    const eventKey = this.config.get(event.code)[this.language];
    const eventCode = this.config.get(event.code).code;

    const pressEvent = new CustomEvent('keyPressed', {
      capture: true,
      detail: {
        key: eventKey,
        keyCode: eventCode,
      },
    });

    this.app.dispatchEvent(pressEvent);
  }

  handleActiveKeys(event) {
    const activeKey = this.#keyboard.keys.find(
      (key) => key.keyData.code === event.detail.keyCode,
    );

    if (activeKey && !this.currentKeys.includes(activeKey)) {
      this.currentKeys.push(activeKey);
    }

    if (this.currentKeys.length === 1) {
      this.currentKeys.forEach((pressedKey) => {
        pressedKey.playAudio();
        pressedKey.key.classList.add('active');
        this.update(pressedKey.keyData.code, pressedKey.keyData[this.language]);
      });
    }

    if (this.currentKeys.length > 1) {
      this.checkForShortcuts();
    }
  }

  handleUnpressedKey(event) {
    let unpressedKey = null;

    if (event.type === 'keyup') {
      if (event.key === 'Shift') {
        this.#keyboard.refillKeys('capsOff');
      }
      unpressedKey = this.currentKeys.find((key) => key.keyData.code === event.code);
    } else {
      unpressedKey = this.currentKeys.find(
        (key) => key.keyData.code === (
          event.target.dataset?.keyCode || event.target.parentNode.dataset.keyCode),
      );
    }
    if (unpressedKey) {
      unpressedKey.key.classList.remove('active');
      this.currentKeys.splice(this.currentKeys.indexOf(unpressedKey), 1);
    }
  }

  checkForShortcuts() {
    this.currentKeys.forEach((currentKey) => {
      if (this.specialKeys.includes(currentKey.keyData.code)) {
        const specialKeyCode = currentKey.keyData.code;
        const keysToCaps = this.currentKeys.filter((key) => key.keyData.code !== specialKeyCode);

        switch (specialKeyCode) {
          case ('ShiftLeft'):
            this.updateCaps(keysToCaps);
            break;
          case ('ShiftRight'):
            this.updateCaps(keysToCaps);
            break;
          case ('ControlLeft'):
            if (keysToCaps.filter((key) => key.keyData.code === 'AltLeft').length) {
              this.language = this.language === 'en' ? 'ru' : 'en';
              this.changeLanguage();
            }
            break;
          default:
            return this;
        }
      }
      return this;
    });
  }

  update(keyCode, char) {
    const start = this.#output.output.selectionStart;
    const end = this.#output.output.selectionEnd;

    if (this.config.get(keyCode)?.input) {
      this.#output.output.selectionStart = this.#output.setContent(char, start, end);
    }

    if (!this.config.get(keyCode)?.input) {
      switch (keyCode) {
        case ('Backspace'):
          this.#output.output.selectionStart = this.#output.processBackspace(start, end);
          break;
        case ('Enter'):
          this.#output.output.selectionStart = this.#output.processEnter(start, end);
          break;
        case ('Tab'):
          this.#output.output.selectionStart = this.#output.processTab(start, end);
          break;
        case ('Delete'):
          this.#output.output.selectionStart = this.#output.processDelete(start, end);
          break;
        case ('ShiftLeft'):
          this.#keyboard.refillKeys('capsOn');
          break;
        case ('ShiftRight'):
          this.#keyboard.refillKeys('capsOn');
          break;

        default:
          return this;
      }
    }
    return this;
  }

  updateCaps(keysToCapsLock) {
    keysToCapsLock.forEach((key) => {
      this.update(key.keyData.code, key.keyData[`${this.language}Caps`]);
    });
  }

  changeLanguage() {
    this.#keyboard.language = this.language;
    setLocalStorage('LANGUAGE', this.language);
    this.#keyboard.refillKeys('language');
  }
}

export default App;
