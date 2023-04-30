import createElement from './helpers';

class Key {
  constructor(container, keyData, keyClasses, handler) {
    this.container = container;
    this.keyData = keyData;
    this.keyClasses = keyClasses;
    this.handler = handler;

    this.render();
  }

  render() {
    const key = createElement('div', 'key', ...this.keyClasses);
    const keyChar = createElement('span', 'key__char');
    keyChar.textContent = this.keyData.en;

    key.append(keyChar);
    this.container.append(key);
  }
}

export default Key;
