**link to deploy:** TBD     
**link to the task:** https://github.com/rolling-scopes-school/tasks/blob/master/tasks/virtual-keyboard/virtual-keyboard-ru.md     
**link to the design file:** https://www.figma.com/file/8p9Zc6A0Ru0fxawOISDNZd/virtual-keyboard?node-id=0%3A1&t=9Dq7HoBD3Hy245Lq-1      

---

**Minimal scope**
- [x] the generation of DOM elements is implemented. `body` in the `index.html` is empty (can contain only `script` tag): `20/20`
- [x] pressing a key on a physical keyboard highlights the key on the virtual keyboard (you should check keystrokes of numbers, letters, punctuation marks, `backspace`, `del` (if it's present), `enter`, `shift`, `alt`, `ctrl`, `tab`, `caps lock`, `space`, arrow keys): `10/10`

**Basic scope**
- [ ] switching keyboard layouts between English and another language is implemented. Selected language should be saved and used on page reload. A keyboard shortcut for switching a language should be specified on the page: `15/15`
- [ ] mouse clicks on buttons of the virtual keyboard or pressing buttons on a physical keyboard inputs characters to the input field (text area): `15/15`
  - [x] pressing the `Up`, `Down`, `Left` or `Right` arrow key inputs an arrow symbol in the input field, or implements navigation on the text area
  - [x] pressing the `Enter` should move a text cursor to the next line
  - [x] the `Tab` key creates a horizontal indent
  - [x] pressing the rest of the function keys on a keyboard does not result in inputting symbols
  - [x] the `Backspace` key removes character before the text cursor
  - [x] the `Del` key removes character after the text cursor
  - [ ] the `Shift`, `Alt`, `Ctrl`, `Caps lock` and `Space` keys should work as on a real keyboard

**Extra scope**
- [x] animation of pressing a key is implemented: `15/15`

**Technical requirements**
- [x] usage of ES6+ features (classes, property destructuring, etc): `15/15`
- [x] usage of ESLint: `10/10`
- [ ] requirements to the repository, commits and pull request are met: `10/10`
  - [x] the work should be done in your private repository
  - [x] the repository name matches the task name (`virtual-keyboard`)
  - [x] source code should be committed to a separate branch
  - [x] the `main` branch should be empty (contain only files like README.md or .gitignore)
  - [x] commit messages should follow the [guideline](https://www.conventionalcommits.org/en)
  - [ ] once the work is finished, create a pull request from a `development` branch to `main`
  - [ ] the pull request name should contain **the task name**
  - [ ] the pull request description should contain the following information:
    - [ ] link to the task
    - [ ] screenshot of your application (one would be enough)
    - [ ] link to your application
    - [ ] date of completion/deadline
    - [ ] your self-check with a preliminary evaluation that is based on the evaluation criteria from the task

**Penalties**
- [ ] there're errors related to the executable code (errors like `favicon.ico: Failed to load resource: the server responded with a status of 404` are not taken into account) or there're eslint-config-airbnb-base warnings: `-15/15`

**Penalties are imposed only by the course administration**
- [ ] the repository (`virtual-keyboard`) or development branch (`development`) name does not comply with the requirements: `-110`
- [ ] less than 5 commits are made or commits are made on the same day: `-110 or expel from the course`
- [ ] a significant portion of the application was completed after the deadline: `-110 or expel from the course`
