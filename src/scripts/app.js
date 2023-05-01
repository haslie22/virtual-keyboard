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

    this.addListeners();
  }

  addListeners() {
    document.addEventListener('beforeunload', () => setLocalStorage(this.language));
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
    const pressEvent = new CustomEvent('keyPressed', {
      capture: true,
      detail: {
        key: event.key,
        keyCode: event.code,
      },
    });

    this.event = event;
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
      });

      if (event.detail.keyCode === 'Backspace') {
        this.update(event.detail.keyCode, event.detail.key, 'backward');
      } else {
        this.update(event.detail.keyCode, event.detail.key);
      }
    }

    if (this.currentKeys.length >= 1) {
      this.checkForShortcuts();
    }
  }

  handleUnpressedKey(event) {
    let unpressedKey = null;

    if (event.type === 'keyup') {
      unpressedKey = this.currentKeys.find((key) => key.keyData.code === event.code);
    } else {
      unpressedKey = this.currentKeys.find(
        (key) => key.keyData.code === (
          event.target.dataset?.keyCode || event.target.parentNode.dataset.keyCode),
      );
    }

    unpressedKey.key.classList.remove('active');
    this.currentKeys.splice(this.currentKeys.indexOf(unpressedKey), 1);
  }

  checkForShortcuts() {
    this.currentKeys.forEach((currentKey) => {
      if (this.specialKeys.includes(currentKey.keyData.code)) {
        const specialKeyCode = currentKey.keyData.code;
        let keysToCapsLock = null;

        switch (currentKey.keyData.code) {
          case ('ShiftLeft'):
            keysToCapsLock = this.currentKeys.filter((key) => key.keyData.code !== specialKeyCode);
            this.updateCaps(keysToCapsLock);
            break;
          case ('ShiftRight'):
            keysToCapsLock = this.currentKeys.filter((key) => key.keyData.code !== specialKeyCode);
            this.updateCaps(keysToCapsLock);
            break;
          case ('Backspace'):
            this.#output.removeLastChar();
            break;
          case ('Enter'):
            this.#output.processEnter();
            break;
          case ('Tab'):
            this.#output.processTab();
            break;
          default:
            console.log('no matches');
        }
      }
    });
  }

  update(keyCode, char) {
    if (this.config.get(keyCode)?.input) {
      const start = this.#output.output.selectionStart;
      const end = this.#output.output.selectionEnd;

      this.#output.output.selectionStart = this.#output.setContent(char, start, end);
    }

    if (!this.config.get(keyCode)?.input) {
      let start = null;
      let end = null;

      switch (keyCode) {
        case ('Backspace'):
          start = this.#output.output.selectionStart;
          end = this.#output.output.selectionEnd;
          this.#output.output.selectionStart = this.#output.removeLastChar(start, end);
          break;

        default:
          console.log('no matches from special keys');
      }
    }
  }

  updateCaps(keysToCapsLock) {
    keysToCapsLock.forEach((key) => {
      this.update(key.keyData.code, key.keyData[`${this.language}Caps`]);
    });
  }
}

// TODO: fix capslock issues

export default App;
