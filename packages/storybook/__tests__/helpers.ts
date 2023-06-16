/*
 * Finds the very first cell in
 * the body of the table (top left)
 */
export function getFirstCell(container: HTMLElement) {
  const body = container.querySelectorAll('[role="rowgroup"]')[1];
  const firstRow = body.querySelectorAll('[role="row"]')[0];
  const firstCell = firstRow.querySelectorAll('[role="cell"]')[0];

  return firstCell;
}

/*
 * Finds the very last cell in
 * the body of the table (bottom right)
 */
export function getLastCell(container: HTMLElement) {
  const body = container.querySelectorAll('[role="rowgroup"]')[1];
  const rows = body.querySelectorAll('[role="row"]');
  const lastRow = rows[rows.length - 1];
  const cells = lastRow.querySelectorAll('[role="cell"]');
  const lastCell = cells[cells.length - 1];

  return lastCell;
}
