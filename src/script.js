import keysMap from './scripts/data/key-config';
import keyStyleConfig from './scripts/data/key-style-config';

import './index.html';
import './style.scss';

import Heading from './scripts/heading';
import Key from './scripts/key';
import Keyboard from './scripts/keyboard';
import Output from './scripts/output';
import App from './scripts/app';

import { getLocalStorage } from './scripts/helpers';

const DEFAULT_LANGUAGE = 'en';
const language = getLocalStorage('LANGUAGE') || DEFAULT_LANGUAGE;

const app = new App(
  document.body,
  keysMap,
  keyStyleConfig,
  language,
  Keyboard,
  Output,
  Key,
  Heading,
);
