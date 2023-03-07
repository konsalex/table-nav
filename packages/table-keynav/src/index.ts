export const testing = () => console.log('Test');

/**
 * Equivalent to prevUntil/nextUntil in jQuery
 * https://api.jquery.com/prevUntil/
 */
export const findUntil = (
  direction: 'next' | 'prev',
  el: HTMLElement | ChildNode,
  matchSelector: string,
  exitSelector?: string
): HTMLElement | null => {
  let element: ChildNode = el;
  const method = direction === 'next' ? 'nextSibling' : 'previousSibling';

  while (element[method]) {
    const sibling = element[method];
    if (!sibling) return null;
    if (
      exitSelector &&
      sibling instanceof HTMLElement &&
      sibling.matches(exitSelector)
    )
      return null;

    if (sibling instanceof HTMLElement && sibling.matches(matchSelector)) {
      return sibling as HTMLElement;
    }

    element = sibling;
  }

  return null;
};

enum ArrowKeys {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
}

const Selectors = {
  Cell: '[role="cell"],[role="gridcell"],td',
  Row: '[role="row"],tr',
} as const;

export const tableKeyDown = (e: KeyboardEvent) => {
  if (
    (e.key === ArrowKeys.ArrowLeft || e.key === ArrowKeys.ArrowRight) &&
    e.target instanceof HTMLElement
  ) {
    console.log(e.target);
    const direction = e.key === ArrowKeys.ArrowLeft ? 'prev' : 'next';
    // Get the closest cell we are currently in
    const cell = e.target.closest(Selectors.Cell) as HTMLElement;

    console.log(cell);

    if (cell) {
      const closeFocusable = findUntil(direction, cell, Selectors.Cell);
      if (closeFocusable) {
        closeFocusable.focus();
      }
    }
  }

  if (
    (e.key === ArrowKeys.ArrowDown || e.key === ArrowKeys.ArrowUp) &&
    e.target instanceof HTMLElement
  ) {
    const row = e.target.closest(Selectors.Row) as HTMLElement;
    const cell = e.target.closest(Selectors.Cell) as HTMLElement;
    console.log(row);
    console.log(cell);
    if (row && cell) {
      // cellIndex does not exist in HTML tables,
      // so we need a custom method to acquire this info
      let position = 0;
      const siblings = cell?.parentNode?.children;
      if (!siblings) return;
      while (cell !== siblings[position]) {
        position++;
      }

      const direction = e.key === ArrowKeys.ArrowUp ? 'prev' : 'next';
      const destinationRow = findUntil(direction, row, Selectors.Row);
      if (!destinationRow) return;
      const child = destinationRow.children[position];
      if (child && child instanceof HTMLElement) child.focus();
    }
  }
};
