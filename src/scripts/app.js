import { APP_NAME } from './data/text-default';

import { createElement } from './helpers';

class App {
  #title;

  #keyboard;

  #ouput;

  #Key;

  constructor(container, config, styleConfig, language, Keyboard, Output, Key, Heading) {
    this.config = config;
    this.styleConfig = styleConfig;
    this.language = language;

    this.app = createElement('div', 'app');
    container.append(this.app);
    this.#title = new Heading(this.app, APP_NAME);
    this.#ouput = new Output(this.app);
    this.#keyboard = new Keyboard(this.app, this.config, this.styleConfig, this.language, Key);

    this.currentKeys = [];

    this.addListeners();
  }

  addListeners() {
    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      this.triggerPressEvent(event);
    });

    document.addEventListener('keyup', () => {
      if (this.currentKeys.length) {
        this.currentKeys.forEach((activeKey) => activeKey.key.classList.remove('active'));
      }

      this.currentKeys = [];
    });

    this.app.addEventListener('keyClicked', (event) => {
      this.update(event.detail.keyCode, event.detail.key);
    });

    this.app.addEventListener('keyPressed', (event) => {
      event.preventDefault();

      const activeKey = this.#keyboard.keys.find(
        (key) => key.keyData.code === event.detail.keyCode,
      );
      this.currentKeys.push(activeKey);

      if (this.currentKeys.length) {
        this.currentKeys.forEach((pressedKey) => pressedKey.key.classList.add('active'));
        this.update(event.detail.keyCode, event.detail.key);
      }
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

  update(keyCode, char) {
    if (this.config.get(keyCode)?.input) {
      this.#ouput.setContent(char);
    }
  }
}

// TODO: handler as argument for 'special' buttons ???

export default App;
