import { DataGridNav } from '@table-nav/core';

/**
 * The keyboard listeners are meant to be attached directly, e.g.
 * table.addEventListener('keydown', dataGridNav.tableKeyDown), which
 * detaches `this` from the instance. They must stay bound so internal
 * helpers like debugLog are still reachable.
 */
describe('DataGridNav listener binding', () => {
  test('tableKeyDown works when passed as a detached reference', () => {
    const nav = new DataGridNav({ debug: true });
    const handler = nav.tableKeyDown;

    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    expect(() => handler(event)).not.toThrow();
  });

  test('tableKeyUp works when passed as a detached reference', () => {
    const nav = new DataGridNav();
    const handler = nav.tableKeyUp;

    expect(() => handler()).not.toThrow();
  });
});
