import keysMap from './scripts/data/key-config';

import './index.html';
import './style.scss';

import Key from './scripts/key';
import Keyboard from './scripts/keyboard';
import Output from './scripts/output';
import App from './scripts/app';

const app = new App(document.body, keysMap, 'en', Keyboard, Output, Key);
