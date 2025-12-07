import { NeedleTable } from '@table-nav/storybook/stories/NeedleTable';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getFirstCell, getLastCell } from './helpers';

/**
 * Will render a table of Needle🪡
 * from Neo4j's Design System
 */
describe('<Needle table />', () => {
  test("Click first body row, and first cell, press Enter to focus in first widget and modify input's value", async () => {
    const { container } = render(<NeedleTable />);

    /**
     * Click and focus to first cell of first
     * row and then start keyboard navigation
     */
    const firstCell = getFirstCell(container);
    await userEvent.click(firstCell);

    /** Erase input's value */
    const input = firstCell.querySelector('input');
    expect(input).not.toBeNull();
    if (!input) throw new Error('Input should not be null');

    const lengthOfValue = input.value.length;

    /** Should focus inside the cell's input */

    const changedValue = 'Modified Cell Value';

    /** Type inside the cell's input */
    const keyboardStream =
      '{enter}' + '{backspace}'.repeat(lengthOfValue) + `${changedValue}{esc}`;

    await userEvent.keyboard(keyboardStream);

    /** Should focus inside the cell's input */
    expect(firstCell.querySelector('input')).toHaveValue(changedValue);
  });

  test('Cell navigation with arrows ⬇️, ➡️', async () => {
    const { container } = render(<NeedleTable />);

    /**
     * Click and focus to first cell of first
     * row and then start keyboard navigation
     */
    const firstCell = getFirstCell(container);
    await userEvent.click(firstCell);

    /**
     * Move two cells down, and two cells right and then focus on cell
     * Then press enter and space to expand the selections
     * and select the second dropdown row. Option select does not work for some reason
     * TODO: make proper react-select testing here to avoid hardcoded string match
     */
    const keyboardStream =
      '{arrowdown}'.repeat(2) +
      '{arrowright}'.repeat(2) +
      '{enter}{space}{arrowdown}';

    await userEvent.keyboard(keyboardStream);

    /** Expect Dropdown option to be open */
    const secondOptionText = 'CREATE (n) RETURN n';
    const selectOptions = container.querySelectorAll('.tablenav__option');
    const secondOptionDOM = selectOptions[1];
    expect(secondOptionDOM?.textContent).toBe(secondOptionText);
  });

  test('Cell navigation with arrows PageDow️n/Up and Home/End', async () => {
    const { container } = render(<NeedleTable />);

    /**
     * Click and focus to first cell of first
     * row and then start keyboard navigation
     */
    let firstCell = getFirstCell(container);
    await userEvent.click(firstCell);

    let keyboardStream = '{pagedown}{end}';

    await userEvent.keyboard(keyboardStream);

    /** Expect last cell in the table, bottom right, to have focus */
    const lastCell = getLastCell(container);
    expect(lastCell).toHaveFocus();

    /** Go back to very first cell with PageUp and Home */
    keyboardStream = '{pageup}{home}';

    await userEvent.keyboard(keyboardStream);

    /** Expect first cell in the table, top left, to have focus */
    firstCell = getFirstCell(container);
    expect(firstCell).toHaveFocus();
  });

  test('Cell navigation with Control + Home/End', async () => {
    const { container } = render(<NeedleTable />);

    /**
     * Click and focus to first cell of first
     * row and then start keyboard navigation
     */
    const firstCell = getFirstCell(container);
    await userEvent.click(firstCell);

    let keyboardStream = '{Control>}{End}{/Control}';
    await userEvent.keyboard(keyboardStream);

    /** Expect last cell in the table, bottom right, to have focus */
    const lastCell = getLastCell(container);
    expect(lastCell).toHaveFocus();

    /** Go back to very first cell with Control and Home */
    keyboardStream = '{Control>}{Home}{/Control}';

    await userEvent.keyboard(keyboardStream);

    /** Expect first cell in the table, top left, to have focus */
    expect(firstCell).toHaveFocus();
  });

  test('Rapid arrow key navigation - pressing next arrow before releasing previous', async () => {
    const { container } = render(<NeedleTable />);

    /**
     * Click and focus to first cell of first
     * row and then start keyboard navigation
     */
    const firstCell = getFirstCell(container);
    await userEvent.click(firstCell);

    /**
     * Simulate rapid navigation where user presses ArrowRight
     * while still holding ArrowDown (common during fast navigation)
     */
    await userEvent.keyboard('{ArrowDown>}{ArrowRight}{/ArrowDown}');

    /** Should have moved down one row and right one cell */
    const body = container.querySelectorAll('[role="rowgroup"]')[1];
    const secondRow = body.querySelectorAll('[role="row"]')[1];
    const secondCell = secondRow.querySelectorAll('[role="cell"]')[1];
    expect(secondCell).toHaveFocus();
  });
});
