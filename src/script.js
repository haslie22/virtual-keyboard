import keysMap from './scripts/data/key-config';
import keyStyleConfig from './scripts/data/key-style-config';

import './index.html';
import './style.scss';

import Heading from './scripts/heading';
import Key from './scripts/key';
import Keyboard from './scripts/keyboard';
import Output from './scripts/output';
import App from './scripts/app';

const app = new App(document.body, keysMap, keyStyleConfig, 'en', Keyboard, Output, Key, Heading);
