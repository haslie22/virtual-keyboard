import { OUTPUT_VALUE } from './data/text-default';

import { createElement } from './helpers';

class Output {
  #content = '';

  constructor(container) {
    this.output = createElement('textarea', ...['output', 'app__output']);
    this.output.textContent = OUTPUT_VALUE;
    container.append(this.output);
  }

  setContent(value) {
    this.#content = value;
    this.output.textContent += this.#content;
  }
}

export default Output;
