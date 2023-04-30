import { createElement } from './helpers';

class Key {
  constructor(container, keyData, keyClasses, handler) {
    this.container = container;
    this.keyData = keyData;
    this.keyClasses = keyClasses;
    this.handler = handler;

    this.key = null;

    this.render();
  }

  render() {
    const key = createElement('div', 'key', ...this.keyClasses);
    key.dataset.keyCode = this.keyData.code;
    this.key = key;

    const keyChar = createElement('span', 'key__char');

    keyChar.textContent = this.keyData.en;

    key.append(keyChar);
    this.container.append(key);

    this.addListeners();
  }

  addListeners() {
    this.key.addEventListener('mousedown', () => {
      this.key.classList.add('active');
      this.triggerClickEvent(this.keyData.en, this.key.dataset.keyCode);
    });

    this.key.addEventListener('mouseup', () => {
      this.key.classList.remove('active');
    });

    this.key.addEventListener('mouseleave', () => {
      this.key.classList.remove('active');
    });

    this.key.addEventListener('keyPressed', () => {
      this.key.classList.add('active');
      this.triggerClickEvent(this.keyData.en, this.key.dataset.keyCode);
    });
  }

  triggerClickEvent(key, keyCode) {
    const clickEvent = new CustomEvent('keyClicked', {
      bubbles: true,
      detail: {
        key,
        keyCode,
      },
    });
    this.key.dispatchEvent(clickEvent);
  }
}

// TODO: fix keys sticking on shortcuts

export default Key;
