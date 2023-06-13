import { useRef, useState } from 'react';
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Dropdown, Table, TextInput } from '@neo4j-ndl/react';
import { Meta } from '@storybook/react';
import { GridKeyNav } from '@cos/table-keynav/src';

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
const COMMON_COLUMNS = (nav: GridKeyNav) => [
  columnHelper.accessor('name', {
    header: 'name (editable)',
    cell: (info) => {
      const currentValue = info.getValue();
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
              /** When dropdown is focused stop the keyboard navigation */
              nav.disable();
            },
            onChange: () => {
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
  const keynav = useRef(new GridKeyNav({ debug: false }));
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data: data,
    columns: COMMON_COLUMNS(keynav.current),
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
    <div className="shadow-2xl border border-neutral-200 rounded overflow-hidden">
      <Table
        resizable={false}
        tableProps={table}
        onKeyUp={() => keynav.current.tableKeyUp()}
        onKeyDown={(e) => keynav.current.tableKeyDown(e)}
      />
    </div>
  );
};
