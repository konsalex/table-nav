<p align="center">
    <img width="200" src="./assets/logo.png"/>
</p>

<h2 align="center" style="margin-top:-20px">table-nav</h2>

**table-nav is a headless utility library, that enables accessible keyboard navigation of data grids (aka tables).**

The ARIA specs for data grid navigation can be found here:

<a href="https://www.w3.org/WAI/ARIA/apg/patterns/grid/"><img src="./assets/w3c.png" height="auto" width="80"></a>

<img src="./assets/demo.gif" />

**table-nav** consists of:
* `core`: Contains all the logic of the library, which is framework-agnostic
* `react`: Useful wrappers to work with React projects
* `svelte` (soon): Useful wrappers to work with Svelte projects. [Example link](https://codesandbox.io/p/sandbox/interesting-cdn-7krjys?embed=1&file=%2Fsrc%2FApp.svelte%3A140%2C20)


### Installation

```bash
yarn add @table-nav/core @table-nav/react
```

### Usage

To use this library you can either use directly the `core` package or the `react` package.

#### Core

Below is an example on how you can use the `core` package in a simple HTML table.
This package is framework-agnostic, and you can find an example integration with [Svelte here](https://codesandbox.io/p/sandbox/interesting-cdn-7krjys?embed=1&file=%2Fsrc%2FApp.svelte%3A132%2C31-132%2C43).

```js
// DataGridNav is the main class of the library
import { DataGridNav } from "@table-nav/core";

// Create a new instance of the class
const dataGridNav = new DataGridNav({
  // Library is written in TS and all the options will be recommended inside your IDE
  debug: true,
});

// Use the function provided by the library to handle the keydown/up events
table.addEventListener("keydown", dataGridNav.tableKeyDown);
table.addEventListener("keyup", dataGridNav.tableKeyUp); // This is neccessery to allow more than 1 key shortcuts
```

#### React

For projects using react, `@table-nav/react` provides a useful hook to work with.


```jsx
// Import hook from "@table-nav/react"
import { useTableNav } from '@table-nav/react';

// Inside your HOC component
const { tableNav, listeners } = useTableNav();

<YourTable {...listeners} />
```

`useTableNav` returns an object with 2 properties:
* `tableNav`: An instance of the `DataGridNav` class. Useful for programmatic navigation, and enabling/disabling the functionality for use-cases, like widget focus inside cell.
* `listeners`: An object with the `onKeyDown` and `onKeyUp` listeners, that you can spread inside your table element.

All the examples inside [`packages/storybook`](https://github.com/konsalex/table-nav/tree/main/packages/storybook/stories) are with `@table-nav/react`, so feel free to take a look how they work.

### Grid Navigation

| Key                                                       | Description                                                                                                                                                                                                                           |
|-----------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <img width="200px"  src="./assets/keys/ArrowRight.png"/>  | Moves focus one cell to the right. If focus is on the right-most cell in the row, focus does not move.                                                                                                                                |
| <img width="200px"  src="./assets/keys/ArrowLeft.png"/>   | Moves focus one cell to the left. If focus is on the left-most cell in the row, focus does not move.                                                                                                                                  |
| <img width="200px"  src="./assets/keys/ArrowUp.png"/>     | Moves focus one cell up. If focus is on the top cell in the column, focus does not move.                                                                                                                                              |
| <img width="200px"  src="./assets/keys/ArrowDown.png"/>   | Moves focus one cell down. If focus is on the bottom cell in the column, focus does not move.                                                                                                                                         |
| <img width="200px"  src="./assets/keys/PageDown.png"/>    | Moves focus down an author-determined number of rows, typically scrolling so the bottom row in the currently visible set of rows becomes one of the first visible rows. If focus is in the last row of the grid, focus does not move. |
| <img width="200px"  src="./assets/keys/PageUp.png"/>      | Moves focus up an author-determined number of rows, typically scrolling so the top row in the currently visible set of rows becomes one of the last visible rows. If focus is in the first row of the grid, focus does not move.      |
| <img width="200px"  src="./assets/keys/Home.png"/>        | Moves focus to the first cell in the row that contains focus.                                                                                                                                                                         |
| <img width="200px"   src="./assets/keys/End.png"/>        | Moves focus to the last cell in the row that contains focus.                                                                                                                                                                          |
| <img width="200px"  src="./assets/keys/ControlHome.png"/> | Moves focus to the first cell in the first row.                                                                                                                                                                                       |
| <img width="200px"   src="./assets/keys/ControlEnd.png"/> | Moves focus to the first cell in the last row.                                                                                                                                                                                        |
| <img width="200px"   src="./assets/keys/Enter.png"/>      | Disables grid navigation and focuses on the first focusable element in the cell. If there are no focusable elements in the cell.                                                                                                      |



### Cell Navigation

> **Note**
> WTF (What the focus) is going on. There is no standardised way to know what is actually focusable in the web.
> To comply with this lib and work properly, you need to add a `tabindex` attribute explicitly to the elements you want to be focusable, inside a cell, except for `input` and `textarea` elements.

| Key                                                          | Description                                                                                                                                                                                                                                                                                                                                  |
|--------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <img width="200px"   src="./assets/keys/Escape.png"/>        | Restores grid navigation.                                                                                                                                                                                                                                                                                                                    |
| <img width="200px"  src="./assets/keys/ArrowRightDown.png"/> | If the cell contains multiple widgets, moves focus to the next widget inside the cell, optionally wrapping to the first widget if focus is on the last widget. Otherwise, passes the key event to the focused widget.<br/>`Arrow Down` is disabled [issue](https://github.com/w3c/aria-practices/issues/2739#issuecomment-1613538972)        |
| <img width="200px"  src="./assets/keys/ArrowLeftUp.png"/>    | If the cell contains multiple widgets, moves focus to the previous widget inside the cell, optionally wrapping to the first widget if focus is on the last widget. Otherwise, passes the key event to the focused widget.     <br/>`Arrow Up` is disabled [issue](https://github.com/w3c/aria-practices/issues/2739#issuecomment-1613538972) |


> The below keystrokes are supported natively by browsers, so they are not implement

- `Tab`: moves focus to the next widget in the grid. Optionally, the focus movement may wrap inside a single cell or within the grid itself. (As described, there should be no trap focus inside a grid cell).
- `Shift + Tab`: moves focus to the previous widget in the grid. Optionally, the focus movement may wrap inside a single cell or within the grid itself.

---

### Known issues 🐝

1. Vertical navigation needs to be a bit smarter: [video](https://share.cleanshot.com/W7QBb0NV)
2. WTF (what the focus) should happen in cell navigation, when you stumble an input? [Related issue](https://github.com/elastic/eui/issues/3334#issuecomment-616603058)


### Contributions

If you want a feature that is not supported or found a bug that you want to fix, fork the repo, and then make a PR with your proposed changes. Still a small project so there are no strict guidelines.

### Useful links 📚

1. https://www.w3.org/WAI/ARIA/apg/patterns/grid/
2. https://www.ag-grid.com/example/
3. https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
4. https://github.com/ETSOO/Shared/blob/master/src/Keyboard.ts
5. https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-element-interactions.md
