import createElement from './helpers';

class Output {
  #content = '';

  constructor(container) {
    this.output = createElement('textarea', 'output');
    container.append(this.output);
  }

  set content(value) {
    this.#content = value;
    this.output.textContent = this.#content;
  }
}

export default Output;
