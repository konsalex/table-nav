import { KeyboardEvent } from 'react';
import { DataGridNav, Config } from '@table-nav/core';

export function useTableNav(options: Config) {
  const nav = new DataGridNav(options);

  return {
    listeners: {
      onKeyDown: (e: KeyboardEvent) => nav.tableKeyDown(e as any),
      onKeyUp: () => nav.tableKeyUp(),
    },
    tableNav: nav,
  };
}
