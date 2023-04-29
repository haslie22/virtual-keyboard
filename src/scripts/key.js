import createElement from './helpers';

class Key {
  constructor(container, keyData, handler) {
    this.container = container;
    this.keyData = keyData;
    this.handler = handler;

    this.render();
  }

  render() {
    const key = createElement('div', 'key', 'key_default');
    const keyChar = createElement('span', 'key__char');
    keyChar.textContent = this.keyData.en;

    key.append(keyChar);
    this.container.append(key);
  }
}

// TODO: create classMap for all types of buttons to use in createElement

export default Key;
