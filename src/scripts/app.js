import createElement from './helpers';

class App {
  #keyboard;

  #ouput;

  #Key;

  constructor(container, config, language, Keyboard, Output, Key) {
    this.config = config;
    this.language = language;

    this.app = createElement('div', 'app');
    container.append(this.app);

    this.#ouput = new Output(this.app);
    this.#keyboard = new Keyboard(this.app, this.config, this.language, Key);
  }
}

export default App;
