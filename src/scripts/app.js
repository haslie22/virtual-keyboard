import { APP_NAME } from './data/text-default';

import {
  createElement, setLocalStorage, detectShiftOnClick, detectPlatform,
} from './helpers';

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

    this.isShiftOn = false;
    this.isCapsOn = false;
    this.platform = detectPlatform();

    this.app = createElement('div', 'app');
    container.append(this.app);
    this.#title = new Heading(this.app, APP_NAME);
    this.#output = new Output(this.app);
    this.#keyboard = new Keyboard(this.app, this.config, this.styleConfig, this.language, Key);

    this.currentKeys = [];
  }

  get isUpperCase() {
    return this.isCapsOn ? !this.isShiftOn : this.isShiftOn;
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
    if (this.config.get(event.code)) {
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
  }

  handleActiveKeys(event) {
    const activeKey = this.#keyboard.keys.find(
      (key) => key.keyData.code === event.detail.keyCode,
    );

    if (activeKey && !this.currentKeys.includes(activeKey)) {
      this.currentKeys.push(activeKey);
    }

    if (this.currentKeys.length === 1) {
      const pressedKey = this.currentKeys[0];
      if (!['ShiftRight', 'ShiftLeft'].includes(pressedKey.keyData.code) || !this.isShiftOn) {
        pressedKey.playAudio();
        pressedKey.key.classList.add('active');

        this.update(pressedKey.keyData.code, pressedKey.keyData[this.language]);
      }
    } else {
      this.checkForShortcuts();
    }
  }

  handleUnpressedKey(event) {
    let unpressedKey = null;

    if (event.type === 'keyup') {
      if (event.key === 'Shift') {
        this.isShiftOn = !this.isShiftOn;
      } else if (event.key === 'CapsLock') {
        this.isCapsOn = !this.isCapsOn;
      }
      this.#keyboard.refillKeys(this.isUpperCaseƒ);
      unpressedKey = this.currentKeys.find((key) => key.keyData.code === event.code);
    } else {
      if (event.type === 'mouseup' && detectShiftOnClick(event) && this.isShiftOn) {
        this.isShiftOn = !this.isShiftOn;
        this.#keyboard.refillKeys(this.isShiftOn);
      }

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
          case ('ShiftRight'):
            this.isShiftOn = true;
            break;
          case ('ControlLeft'):
            if (keysToCaps.filter((key) => key.keyData.code === 'AltLeft').length) {
              this.language = this.language === 'en' ? 'ru' : 'en';
              this.changeLanguage();
            }
            break;
          case ('CapsLock'):
            this.isCapsOn = true;
            break;
          default:
        }
      }
    });

    this.currentKeys.forEach((currentKey) => {
      if (!this.specialKeys.includes(currentKey.keyData.code)) {
        this.update(currentKey.keyData.code);
      }
    });
    return this;
  }

  getChar(keyCode) {
    return this.config.get(keyCode)[`${this.language}${this.isUpperCase ? 'Caps' : ''}`];
  }

  update(keyCode) {
    const start = this.#output.output.selectionStart;
    const end = this.#output.output.selectionEnd;

    if (this.config.get(keyCode)?.input) {
      this.#output.output.selectionStart = this.#output.setContent(
        this.getChar(keyCode),
        start,
        end,
      );
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
        case ('ShiftRight'):
        case ('ShiftLeft'):
          this.isShiftOn = true;
          this.#keyboard.refillKeys(true);
          break;
          // case ('CapsLock'):
          //   this.isShiftOn = true;
          //   this.#keyboard.refillKeys(true);
          //   break;

        default:
      }
    }
    return this;
  }

  // updateCaps(keysToCapsLock) {
  //   keysToCapsLock.forEach((key) => {
  //     this.update(key.keyData.code, key.keyData[`${this.language}Caps`]);
  //   });
  // }

  changeLanguage() {
    this.#keyboard.language = this.language;
    setLocalStorage('LANGUAGE', this.language);
    this.#keyboard.refillKeys(this.isShiftOn);
  }

  turnOnCapsLock() {
    this.isShiftOn = true;
    this.#keyboard.refillKeys(this.isShiftOn);
  }

  turnOffCapsLock() {
    this.isShiftOn = false;
    this.#keyboard.refillKeys(this.isShiftOn);
  }
}

export default App;
