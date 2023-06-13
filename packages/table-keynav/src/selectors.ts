export const Selectors = {
  Cell: '[role="cell"],[role="gridcell"],[role="columnheader"],[role="rowheader"],td,th',
  Row: '[role="row"],tr',
  RowGroup: '[role="rowgroup"],thead,tbody,tfoot',
  /** Selector from here: https://github.com/Shopify/polaris/blob/main/polaris-react/src/utilities/focus.ts#L10 */
  Focusable:
    // 'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not([aria-disabled="true"]):not([tabindex="-1"]):not(:disabled),*[tabindex]:not([tabindex="-1"])',
    'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not([aria-disabled="true"]):not([tabindex="-1"]):not(:disabled),*[tabindex]',
} as const;
