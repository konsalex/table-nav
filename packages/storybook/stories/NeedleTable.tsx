import { DataGridNav } from '@table-nav/core';
import { useTableNav } from '@table-nav/react';
import { useState } from 'react';
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Button,
  Dropdown,
  Table,
  TextInput,
  Typography,
} from '@neo4j-ndl/react';
import { Meta } from '@storybook/react';

export default {
  title: 'Neo4j/Needle Table',
  parameters: {},
} as Meta;

type TestDataFormat = {
  name: string;
  age: number;
  cypherCommand: string;
};

const data: TestDataFormat[] = [
  {
    name: 'John',
    age: 20,
    cypherCommand: 'MATCH (n) RETURN n',
  },
  {
    name: 'John',
    age: 20,
    cypherCommand: 'MATCH (n) RETURN n',
  },
  {
    name: 'John',
    age: 20,
    cypherCommand: 'MATCH (n) RETURN n',
  },
];

const ExampleDropdown = [
  {
    label: 'MATCH (n) RETURN n',
    value: 'match',
  },
  {
    label: 'CREATE (n) RETURN n',
    value: 'create',
  },
];

const columnHelper = createColumnHelper<TestDataFormat>();

/** Columns (can be defined out of the component to avoid useMemo) */
const COMMON_COLUMNS = (nav: DataGridNav) => [
  columnHelper.accessor('name', {
    header: 'name (editable)',
    cell: (info) => {
      const currentValue = info.getValue();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isFocused, setIsFocused] = useState(false);
      return (
        <TextInput
          aria-label="name"
          size="extra-small"
          data-testid={`text-input-${info.cell.id}`}
          readOnly={!isFocused}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
          }}
          onChange={() => console.log('Changing')}
          defaultValue={currentValue}
        />
      );
    },
    minSize: 180,
  }),
  columnHelper.accessor('age', {
    cell: (info) => info.getValue(),
    minSize: 80,
  }),
  columnHelper.display({
    id: 'cypherCommand',
    header: 'Cypher Command',
    cell: (info) => {
      return (
        <Dropdown
          data-testid={info.cell.id}
          size="extra-small"
          type="select"
          aria-label="cypher command select"
          style={{ minWidth: '250px' }}
          selectProps={{
            classNamePrefix: 'tablenav',
            menuPosition: 'fixed',
            options: ExampleDropdown,
            defaultValue: ExampleDropdown[0],
            onFocus: () => {
              console.info('Stopping keyboard navigation');
              /** When dropdown is focused stop the keyboard navigation */
              nav.disable();
            },
            onChange: () => {
              console.info('Starting keyboard navigation');
              /** When an option is selected continue the keyboard navigation */
              nav.enable();
            },
          }}
        />
      );
    },
    minSize: 400,
    size: 400,
  }),
];

export const NeedleTable = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [debug, setDebug] = useState(false);

  const { tableNav, listeners } = useTableNav();

  const table = useReactTable({
    data: data,
    columns: COMMON_COLUMNS(tableNav),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    state: {
      rowSelection,
    },
    enableSorting: false,
    onRowSelectionChange: setRowSelection,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Button
          className="max-w-max items-baseline"
          onClick={() => setDebug(!debug)}
        >
          {debug ? 'Disable' : 'Enable'} debug logs
        </Button>
        {debug && (
          <Typography className="text-gray-500" variant="body-small">
            Check dev console
          </Typography>
        )}
      </div>
      <div className="shadow-2xl border border-neutral-200 rounded overflow-hidden">
        <Table resizable={false} tableProps={table} {...listeners} />
      </div>
    </div>
  );
};
