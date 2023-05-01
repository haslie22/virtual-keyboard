import { createElement } from './helpers';

class Key {
  constructor(container, keyData, keyClasses, language, audio) {
    this.container = container;
    this.keyData = keyData;
    this.keyClasses = keyClasses;
    this.language = language;
    this.audio = audio;

    this.key = null;
    this.keyChar = null;

    this.render();
  }

  render() {
    const key = createElement('div', 'key', ...this.keyClasses);
    key.dataset.keyCode = this.keyData.code;
    this.key = key;

    const keyChar = createElement('span', 'key__char');
    this.keyChar = keyChar;

    keyChar.textContent = this.keyData[this.language];

    key.append(keyChar);
    this.container.append(key);

    this.addListeners();
  }

  addListeners() {
    this.key.addEventListener('mousedown', () => {
      this.key.classList.add('active');
      this.playAudio();
      this.triggerClickEvent(this.keyData.en, this.key.dataset.keyCode);
    });

    this.key.addEventListener('mouseup', () => {
      this.key.dispatchEvent(new KeyboardEvent('keyup'));
    });

    this.key.addEventListener('mouseleave', () => {
      this.key.classList.remove('active');
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

  playAudio() {
    this.audio.currentTime = 0;
    this.audio.play();
  }
}

export default Key;
