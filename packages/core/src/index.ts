import { Keys } from './keys';
import { Selectors } from './selectors';

type FocusableElement = HTMLElement | SVGElement;

export type Config =
  | {
      selectors?: Partial<typeof Selectors>;
      /** How many rows to move when pressing page up/down - Default goes to first/last row */
      pageUpDown?: number;
      debug?: boolean;
    }
  | undefined;

export class DataGridNav {
  private selectors: Record<keyof typeof Selectors, string>;
  readonly pageUpDown: number | undefined;
  private keys: string[] = [];
  private disabled: boolean;
  readonly debug: boolean;

  constructor();
  constructor(config: Config);
  constructor(config: Config = {}) {
    const { selectors = {}, pageUpDown, debug = false } = config;
    this.selectors = { ...Selectors, ...selectors };
    this.pageUpDown = pageUpDown;
    this.keys = [];
    this.debug = debug;
    this.disabled = false;
  }

  private debugLog = (functionName: string, message: string) => {
    if (this.debug) console.info(`[${functionName}]: ${message}`);
  };

  /**
   * Disables the keyboard listener in cases
   * that elements inside the grid need to use
   * arrows keys etc., like select dropdowns
   */
  public disable() {
    this.disabled = true;
  }

  /**
   * Enables the keyboard listeners
   */
  public enable() {
    this.disabled = false;
  }

  private isFocusable(el: Element): el is FocusableElement {
    return el instanceof HTMLElement || el instanceof SVGElement;
  }

  /** Used as a keyboard listener for key up */
  public tableKeyUp() {
    // TODO: have a cleanup as user can press key
    //  and then move to another tab, and get back to the same tab
    // so this will not be empty (the bug exists with .pop)
    this.keys = [];
  }

  /** Used as a keyboard listener for key down */
  public tableKeyDown(e: KeyboardEvent) {
    this.debugLog('tableKeyDown', `Key pressed: ${e.key}`);
    if (this.disabled) {
      this.debugLog('tableKeyDown', 'interaction is disabled');
      return;
    }
    /**
     * Avoid page scrolling etc.
     * Enable default behavior for:
     * Tab, Shift + Tab
     * TODO: Actually it will be better to just prevent
     * in ArrowKeys and PageKeys maybe?
     * Or should the consumer stop propagation?!
     * Cannot work with preventDefault as it will
     * first capture the event from an input in cell for example
     */
    if (
      Keys.ArrowDown === e.key ||
      Keys.ArrowUp === e.key ||
      Keys.ArrowLeft === e.key ||
      Keys.ArrowRight === e.key
    ) {
      e.preventDefault();
    }

    /**
     * Add key to the stack if it's
     * not the same with the last (long press)
     */
    if (this.keys.length === 0 || this.keys[this.keys.length - 1] !== e.key) {
      this.keys.push(e.key);
    }

    /**
     * Need to check if we are inside a grid cell
     * or not to enable/disable Grid Navigation
     */
    if (!(e.target instanceof Element)) return;
    const cell = e.target.parentElement?.closest(
      `${this.selectors.Cell},${this.selectors.Row}`
    );

    if (!cell) {
      this.debugLog('tableKeyDown', 'cell not found');
      return;
    }

    if (cell.matches(this.selectors.Cell)) {
      this.debugLog('tableKeyDown', 'event captured in cell');
      this.cellNavigation(e);
    } else {
      this.debugLog('tableKeyDown', 'event captured in cell');
      this.gridNavigation(e);
    }
  }

  /**
   * Handles the navigation inside a cell
   */
  public cellNavigation(e: KeyboardEvent) {
    if (!(e.target instanceof Element)) return;

    /**
     * Keys: Escape
     * Restore grid navigation
     */
    if (e.key === Keys.Escape) {
      const cell = e.target.closest(this.selectors.Cell);
      if (cell && this.isFocusable(cell)) {
        cell.focus();
        return;
      }
    }

    /**
     * Keys: ArrowRight, ArrowDown
     * Move to the next focusable cell, or the first one
     */
    if (e.key === Keys.ArrowRight || e.key === Keys.ArrowDown) {
      const cell = e.target.closest(this.selectors.Cell);
      if (!cell) {
        this.debugLog('cellNavigation', 'cell not found');
        return;
      }

      const focusableWidgets = [
        ...cell.querySelectorAll(this.selectors.Focusable),
      ];

      const widgetIdx = focusableWidgets.findIndex((el) => el === e.target);

      const nextFocusable =
        widgetIdx === focusableWidgets.length - 1 ? 0 : widgetIdx + 1;
      const widgetToFocus = focusableWidgets[nextFocusable];
      if (this.isFocusable(widgetToFocus)) {
        widgetToFocus.focus();
      }

      return;
    }

    /**
     * Keys: ArrowLeft, ArrowUp
     * Move to the previous focusable cell, or the last one
     */
    if (e.key === Keys.ArrowLeft || e.key === Keys.ArrowUp) {
      const cell = e.target.closest(this.selectors.Cell);

      if (!cell) {
        this.debugLog('cellNavigation', 'cell not found');
        return;
      }

      const focusableWidgets = [
        ...cell.querySelectorAll(this.selectors.Focusable),
      ];

      const widgetIdx = focusableWidgets.findIndex((el) => el === e.target);

      const previousFocusable =
        widgetIdx === 0 ? focusableWidgets.length - 1 : widgetIdx - 1;
      const widgetToFocus = focusableWidgets[previousFocusable];
      if (this.isFocusable(widgetToFocus)) {
        widgetToFocus.focus();
      }

      return;
    }
  }

  /**
   * Handles the navigation outside a cell
   * on the grid level
   */
  public gridNavigation(e: KeyboardEvent) {
    const { target } = e;
    if (!(e.target instanceof Element)) return;
    if (!(target instanceof Element)) return;

    if (this.keys.length === 1) {
      /**
       * Keys: Enter
       * Should move focus inside the cell to the first focusable element:
       * https://www.w3.org/WAI/ARIA/apg/patterns/grid/#gridNav_inside
       */
      if (e.key === Keys.Enter) {
        const cell = e.target.querySelector(this.selectors.Focusable);
        if (cell && this.isFocusable(cell)) {
          // Enter can trigger child elements:
          // Source: https://www.reddit.com/r/learnjavascript/comments/14kpj24/wrong_keydown_listener_is_called_with_focus/
          cell.focus();
          e.preventDefault();
        }
      }

      /**
       * Keys: ArrowLeft, ArrowRight
       * Should move focus to the next/previous cell
       */
      if (e.key === Keys.ArrowLeft || e.key === Keys.ArrowRight) {
        const direction = e.key === Keys.ArrowLeft ? 'prev' : 'next';
        // Get the closest cell we are currently in
        const cell = e.target.closest(this.selectors.Cell);

        if (cell && cell instanceof Element) {
          const closeFocusable = this.findUntil(
            direction,
            cell,
            this.selectors.Cell
          );
          if (closeFocusable) {
            closeFocusable.focus();
          }
        }
      }

      /**
       * Keys: Up,Down
       * Should move focus to the same column of the next/previous row
       */
      if (e.key === Keys.ArrowDown || e.key === Keys.ArrowUp) {
        this.verticalCellNavigation(e);
        return;
      }

      /**
       * Keys: PageUp, PageDown
       * Should move focus to the first/last row
       * or a predefined number of rows if user provides a value
       */
      if (e.key === Keys.PageUp || e.key === Keys.PageDown) {
        this.pageCellNavigation(e);
        return;
      }

      /**
       * Keys: Home, End
       * Should move focus to the first/last cell of the current row
       */
      if (e.key === Keys.Home || e.key === Keys.End) {
        const row = e.target.closest(this.selectors.Row) as Element;
        const rowChildren = [...(row?.children || [])];
        if (e.key === 'End') rowChildren.reverse();
        this.focusOnFirstCell(rowChildren);
      }
    } else {
      /**
       * Keys: Control + Home, Control + End
       * Should move focus to the first/last cell of the first/last row
       */
      const [firstKey, secondKey] = this.keys;
      if (
        firstKey === 'Control' &&
        (secondKey === Keys.Home || secondKey === Keys.End)
      ) {
        const row = e.target.closest(this.selectors.Row) as Element;
        const siblings = row.parentElement?.children;

        if (!siblings) {
          this.debugLog('cellNavigation', 'siblings not found');
          return;
        }

        const rowToFocus =
          secondKey === Keys.Home ? siblings[0] : siblings[siblings.length - 1];
        const rowChildren = [...(rowToFocus?.children || [])];
        if (secondKey === Keys.End) rowChildren.reverse();
        this.focusOnFirstCell(rowChildren);
      }
    }
  }

  private pageCellNavigation(e: KeyboardEvent) {
    if (!(e.target instanceof Element)) return;
    const row = e.target.closest(this.selectors.Row) as Element;
    const cell = e.target.closest(this.selectors.Cell) as Element;

    if (row && cell) {
      const position = this.getColumnIndex(cell);

      if (position === undefined) {
        this.debugLog('cellNavigation', 'position not found');
        return;
      }

      const direction = e.key === Keys.PageUp ? 'prev' : 'next';
      const siblings = row.parentElement?.children;

      if (!siblings) {
        this.debugLog('cellNavigation', 'siblings not found');
        return;
      }

      // If pageUpDown is defined, we should move that number of rows, or to the closest possible
      let destinationRow: Element | ChildNode;
      if (this.pageUpDown) {
        const methodClbk =
          direction === 'prev' ? 'previousSibling' : 'nextSibling';
        let sibling = row[methodClbk];
        if (sibling === null) return;

        let lastVisitedSibling = sibling;

        for (let i = 0; i < this.pageUpDown - 1 && sibling; i++) {
          sibling = sibling[methodClbk];
          if (sibling) {
            lastVisitedSibling = sibling;
          }
        }
        destinationRow = sibling ? sibling : lastVisitedSibling;
      } else {
        destinationRow =
          direction === 'prev' ? siblings[0] : siblings[siblings.length - 1];
      }
      if (!destinationRow || !(destinationRow instanceof Element)) return;

      const child = destinationRow.children[position];
      if (child && this.isFocusable(child)) child.focus();
    }
  }

  private verticalCellNavigation(e: KeyboardEvent) {
    if (!(e.target instanceof Element)) return;
    const row = e.target.closest(this.selectors.Row) as Element;
    const cell = e.target.closest(this.selectors.Cell) as Element;

    if (row && cell) {
      const cellPosition = this.getColumnIndex(cell);
      const rowPosition = this.getRowIndex(row);
      this.debugLog('gridNavigation', `Initial row position: ${rowPosition}`);
      this.debugLog('gridNavigation', `Initial cell position: ${cellPosition}`);
      if (cellPosition === undefined || rowPosition === undefined) {
        this.debugLog(
          'verticalCellNavigation',
          'row or cell position not found'
        );
        return;
      }

      const direction = e.key === Keys.ArrowUp ? 'prev' : 'next';

      /** Find previous rowgroup and focus on the proper cell */
      if (rowPosition === 0 && direction === 'prev') {
        const currentRowGroup = row.parentElement?.closest(
          this.selectors.RowGroup
        );
        const siblingRowGroups = [
          ...(currentRowGroup?.parentElement?.children || []),
        ];
        const currentRowGroupIdx = siblingRowGroups.findIndex(
          (el) => el === currentRowGroup
        );
        if (currentRowGroupIdx !== 0) {
          const previousRowGroup = siblingRowGroups[currentRowGroupIdx - 1];
          const rows = [
            ...previousRowGroup.querySelectorAll(this.selectors.Row),
          ];
          const child = rows[rows.length - 1].children[cellPosition];
          if (child && this.isFocusable(child)) child.focus();
          return;
        }
      }

      const siblingRows = [
        ...(row.parentElement?.querySelectorAll(this.selectors.Row) || []),
      ];
      /** Find next rowgroup and focus on the proper cell */
      if (rowPosition === siblingRows.length - 1 && direction === 'next') {
        const currentRowGroup = row.parentElement?.closest(
          this.selectors.RowGroup
        );
        const siblingRowGroups = [
          ...(currentRowGroup?.parentElement?.children || []),
        ];
        const currentRowGroupIdx = siblingRowGroups.findIndex(
          (el) => el === currentRowGroup
        );
        if (currentRowGroupIdx !== siblingRowGroups.length - 1) {
          const nextRowGroup = siblingRowGroups[currentRowGroupIdx + 1];
          const rows = [...nextRowGroup.querySelectorAll(this.selectors.Row)];
          const child = rows[0].children[cellPosition];
          if (child && this.isFocusable(child)) child.focus();
          return;
        }
        return;
      }

      /** Navigation in the same rowgroup */
      const destinationRow = this.findUntil(direction, row, this.selectors.Row);
      if (!destinationRow) return;

      const child = destinationRow.children[cellPosition];
      if (child && this.isFocusable(child)) child.focus();
    }
  }

  /**
   * Sending a row `Element` and then the first cell will be focused.
   *
   * If you want to focus the last cell then the row children can be passed in
   * reversed order
   */
  private focusOnFirstCell(el: Element[]) {
    for (let i = 0; i < el.length; i++) {
      const child = el[i];
      if (this.isFocusable(child)) {
        child.focus();
        return;
      }
    }
  }

  /**
   * Get the column index of a `cell` based on the first `row` parent.
   * `cellIndex` could be used, but it's not supported in HTML tables.
   */
  private getColumnIndex(cell: Element) {
    let position = 0;
    const siblings = cell?.parentNode?.children;
    if (!siblings) return undefined;

    while (cell !== siblings[position] && siblings[position] !== undefined) {
      position++;
    }

    // Cell position find was not possible, maybe should log here
    if (siblings[position] === undefined) {
      this.debugLog('getColumnIndex', 'position finding was not successful');
      return undefined;
    }
    return position;
  }

  /**
   * Get the row index of a `row` based
   * on its sibling rows
   */
  private getRowIndex(row: Element) {
    let position = 0;
    const siblings = row?.parentNode?.children;
    if (!siblings) return undefined;

    while (row !== siblings[position] && siblings[position] !== undefined) {
      position++;
    }

    // Cell position find was not possible
    if (siblings[position] === undefined) {
      this.debugLog('getRowIndex', 'position finding was not successful');
      return undefined;
    }
    return position;
  }

  /**
   * Equivalent to prevUntil/nextUntil in jQuery
   * https://api.jquery.com/prevUntil/
   */
  private findUntil(
    direction: 'next' | 'prev',
    el: Element | ChildNode,
    matchSelector: string,
    exitSelector?: string
  ): FocusableElement | null {
    let element: ChildNode = el;
    const method = direction === 'next' ? 'nextSibling' : 'previousSibling';

    while (element[method]) {
      const sibling = element[method];
      if (!sibling) return null;
      if (
        exitSelector &&
        sibling instanceof Element &&
        sibling.matches(exitSelector)
      ) {
        return null;
      }

      if (sibling instanceof Element && sibling.matches(matchSelector)) {
        return sibling as FocusableElement;
      }

      element = sibling;
    }

    return null;
  }
}
