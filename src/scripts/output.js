import { createElement } from './helpers';

class Output {
  #content = '';

  constructor(container) {
    this.output = createElement('textarea', ...['output', 'app__output']);
    this.output.textContent = '';
    this.#content = this.output.textContent;

    container.append(this.output);
  }

  setContent(value, start, end) {
    this.output.textContent = this.#content.substring(0, start)
    + value + this.#content.substring(end);
    this.#content = this.output.textContent;

    return this.#content.length;
  }

  removeLastChar(start, end) {
    if (start === end) {
      this.output.textContent = this.#content.substring(0, start - 1)
      + this.#content.substring(end);
    } else {
      this.output.textContent = this.#content.substring(0, start)
      + this.#content.substring(end);
    }
    this.#content = this.output.textContent;
    return (start === end ? start - 1 : start);
  }

  processEnter() {
    this.#content += '\n';
    this.output.textContent = this.#content;
  }

  processTab() {
    this.#content += '\t';
    this.output.setRangeText = this.#content;
  }
}

export default Output;
