import * as config from './scripts/data/key-config';
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
console.log(language);

// eslint-disable-next-line no-unused-vars
const app = new App(
  document.body,
  config.keysMap,
  config.specialKeys,
  keyStyleConfig,
  language,
  Keyboard,
  Output,
  Key,
  Heading,
);
