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

    return start + 1;
  }

  processBackspace(start, end) {
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

  processDelete(start, end) {
    if (start === end) {
      this.output.textContent = this.#content.substring(0, start)
      + this.#content.substring(end + 1);
    } else {
      this.output.textContent = this.#content.substring(0, start)
      + this.#content.substring(end);
    }
    this.#content = this.output.textContent;
    return start;
  }

  processEnter(start, end) {
    this.output.textContent = `${this.#content.substring(0, start)}\n${this.#content.substring(end)}`;
    this.#content = this.output.textContent;

    return (start + 1, start + 1);
  }

  processTab(start, end) {
    this.output.textContent = `${this.#content.substring(0, start)
    }\t${this.#content.substring(end)}`;
    this.#content = this.output.textContent;

    return start + 1;
  }
}

export default Output;
