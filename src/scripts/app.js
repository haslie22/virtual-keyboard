import { APP_NAME } from './data/text-default';

import createElement from './helpers';

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
  }
}

export default App;
