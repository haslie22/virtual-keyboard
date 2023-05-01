import { OUTPUT_VALUE } from './data/text-default';

import { createElement } from './helpers';

class Output {
  #content = '';

  constructor(container) {
    this.output = createElement('textarea', ...['output', 'app__output']);
    this.output.textContent = OUTPUT_VALUE;
    this.#content = this.output.textContent;

    container.append(this.output);
  }

  setContent(value) {
    this.#content += value;
    this.output.textContent = this.#content;
  }

  removeLastChar() {
    this.#content = this.#content.slice(0, -1);
    this.output.textContent = this.#content;
  }

  processEnter() {
    this.#content += '\n';
    this.output.textContent = this.#content;
  }

  processTab() {
    this.#content += '\t';
    this.output.textContent = this.#content;
  }
}

export default Output;
