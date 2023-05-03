import { APP_NAME } from './data/text-default';

import {
  createElement, setLocalStorage, detectShiftOnClick, detectCapsLockOnClick, detectPlatform,
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

    this.platform = detectPlatform();

    this.isShiftOn = false;
    this.isCapsOn = false;
    this.ignoreNextKeyUp = false;
    this.ignoreNextKeyDown = true;

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
      if ((event.key === 'CapsLock')) {
        this.ignoreNextKeyDown = !this.ignoreNextKeyDown;

        if (this.ignoreNextKeyDown && this.platform === 'Windows') return;
      }

      this.triggerPressEvent(event);
    });

    document.addEventListener('keyup', (event) => {
      if (this.currentKeys.length || (event.key === 'CapsLock')) {
        if (((event.key === 'CapsLock'))) {
          this.ignoreNextKeyUp = !this.ignoreNextKeyUp;

          if (this.ignoreNextKeyUp && this.platform === 'Windows') return;
        }

        this.handleUnpressedKey(event);
      }
    });

    this.#keyboard.keyboard.addEventListener('mousedown', (event) => {
      event.preventDefault();
      this.#output.output.focus();
    });

    this.#keyboard.keyboard.addEventListener('mouseup', (event) => {
      if (this.currentKeys.length && !detectCapsLockOnClick(event)) {
        this.handleUnpressedKey(event);
      }
    });

    this.#keyboard.keyboard.addEventListener('mouseout', (event) => {
      if (event.buttons === 0) {
        return;
      }
      const upEvent = new MouseEvent('mouseup');
      Object.defineProperty(upEvent, 'target', { writable: false, value: event.target });
      this.#keyboard.keyboard.dispatchEvent(upEvent);
    });

    this.app.addEventListener('keyClicked', (event) => {
      if ((event.detail.keyCode !== 'CapsLock') || !this.isCapsOn) {
        this.handleActiveKeys(event);
      } else {
        this.handleUnpressedKey({
          type: 'keyup', key: 'CapsLock', code: 'CapsLock',
        });
      }
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

    this.checkForShortcuts();
  }

  handleUnpressedKey(event) {
    let unpressedKey = null;

    if (event.type === 'keyup') {
      unpressedKey = this.currentKeys.find((key) => key.keyData.code === event.code);
      unpressedKey = unpressedKey
      && this.#keyboard.keys.find((key) => key.keyData.code === event.code);

      if (event.key === 'Shift') {
        this.isShiftOn = false;
      } else if (event.key === 'CapsLock') {
        this.isCapsOn = false;
        if (this.platform === 'MacOS' && unpressedKey) {
          unpressedKey.playAudio();
          unpressedKey.key.classList.remove('active');

          this.#keyboard.refillKeys(this.isUpperCase);
        }
      }
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
      this.#keyboard.refillKeys(this.isUpperCase);
    }
  }

  checkForShortcuts() {
    const oldShiftState = this.isShiftOn;
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
            this.update(specialKeyCode);
        }
      }

      // prevent multiple Shift down on Windows
      if (!['ShiftRight', 'ShiftLeft'].includes(currentKey.keyData.code) || !oldShiftState || !this.isShiftOn) {
        currentKey.playAudio();
        currentKey.key.classList.add('active');
        this.#keyboard.refillKeys(this.isUpperCase);
      }
    });

    const keys = this.currentKeys.filter(
      (currentKey) => !this.specialKeys.includes(currentKey.keyData.code),
    );
    if (keys.length > 0) this.update(keys[keys.length - 1].keyData.code);

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
        default:
      }
    }
    return this;
  }

  changeLanguage() {
    this.#keyboard.language = this.language;
    setLocalStorage('LANGUAGE', this.language);
    this.#keyboard.refillKeys(this.isShiftOn);
  }
}

export default App;
