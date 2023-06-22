import { Meta } from '@storybook/react';
import { useTableNav } from '@table-nav/react';
import { faker } from '@faker-js/faker';
import {
  Column,
  Table,
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import React, { HTMLProps, useRef } from 'react';
import { useToggleState } from 'react-stately';
import {
  AriaButtonProps,
  AriaCheckboxProps,
  useButton,
  useCheckbox,
} from 'react-aria';

export default {
  title: 'Tanstack/Expanding table',
} as Meta;

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const newPerson = (): Person => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(40),
    visits: faker.datatype.number(1000),
    progress: faker.datatype.number(100),
    status: faker.helpers.shuffle<Person['status']>([
      'relationship',
      'complicated',
      'single',
    ])[0]!,
  };
};

function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      } as any;
    });
  };

  return makeDataLevel();
}

export const ExpandingTable = () => {
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        header: 'Name',
        columns: [
          {
            accessorKey: 'firstName',
            header: ({ table }) => (
              <>
                <div className="flex items-center gap-1">
                  <AccessibleCheckbox
                    isSelected={table.getIsAllRowsSelected()}
                    isIndeterminate={table.getIsSomeRowsSelected()}
                    onClick={table.getToggleAllRowsSelectedHandler()}
                    aria-label="Select all names"
                  />
                  <AccessibleButton
                    onPress={table.getToggleAllRowsExpandedHandler()}
                  >
                    {table.getIsAllRowsExpanded() ? '👇' : '👉'}
                  </AccessibleButton>{' '}
                  First Name
                </div>
              </>
            ),
            cell: ({ row, getValue }) => {
              return (
                <div
                  style={{
                    paddingLeft: `${row.depth * 2}rem`,
                  }}
                  className="flex items-center gap-1"
                >
                  <>
                    <AccessibleCheckbox
                      isIndeterminate={row.getIsSomeSelected()}
                      isSelected={row.getIsSelected()}
                      onChange={row.getToggleSelectedHandler()}
                      aria-label="Select name"
                    />
                    {row.getCanExpand() ? (
                      <AccessibleButton
                        onPress={row.getToggleExpandedHandler()}
                      >
                        {row.getIsExpanded() ? '👇' : '👉'}
                      </AccessibleButton>
                    ) : (
                      '🔵'
                    )}{' '}
                    {getValue()}
                  </>
                </div>
              );
            },
            footer: (info) => info.column.id,
          },
          {
            accessorFn: (row) => row.lastName,
            id: 'lastName',
            cell: (info) => info.getValue(),
            header: () => <span>Last Name</span>,
            footer: (info) => info.column.id,
          },
        ],
      },
      {
        header: 'Info',
        columns: [
          {
            accessorKey: 'age',
            header: () => 'Age',
            footer: (info) => info.column.id,
          },
          {
            header: 'More Info',
            columns: [
              {
                accessorKey: 'visits',
                header: () => <span>Visits</span>,
                footer: (info) => info.column.id,
              },
              {
                accessorKey: 'status',
                header: 'Status',
                footer: (info) => info.column.id,
              },
              {
                accessorKey: 'progress',
                header: 'Profile Progress',
                footer: (info) => info.column.id,
              },
            ],
          },
        ],
      },
    ],
    []
  );

  const [data] = React.useState(() => makeData(100, 5, 3));

  const { listeners } = useTableNav({ debug: true });

  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => (row as any).subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div className="p-4">
      <div className="overflow-hidden shadow rounded-md border border-neutral-200 ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table {...listeners} className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, idx) => {
                  return (
                    <th
                      key={header.id}
                      tabIndex={-1}
                      colSpan={header.colSpan}
                      className="py-3.5 pl-4 border border-neutral-300 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanFilter() && idx === 0 ? (
                            <Filter column={header.column} table={table} />
                          ) : null}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        role="gridcell"
                        tabIndex={-1}
                        key={cell.id}
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            {table
              .getFooterGroups()
              .slice(0, 1)
              .map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <th tabIndex={-1} key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
          </tfoot>
        </table>
        <div className="flex items-center gap-2 p-4">
          <AccessibleButton
            className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </AccessibleButton>
          <AccessibleButton
            className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </AccessibleButton>
          <AccessibleButton
            className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </AccessibleButton>
          <AccessibleButton
            className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </AccessibleButton>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span>
          <div> - {table.getRowModel().rows.length} Rows</div>
        </div>
      </div>
    </div>
  );
};

function Filter({
  column,
  table,
}: {
  column: Column<any, any>;
  table: Table<any>;
  isTextArea?: boolean;
}) {
  const columnFilterValue = column.getFilterValue();

  return (
    <input
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={(e) => {
        e.stopPropagation();
        e.preventDefault();
        column.setFilterValue(e.target.value);
      }}
      placeholder="Search here..."
      className="block w-3/4 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
  );
}

function AccessibleCheckbox(
  props: Partial<AriaCheckboxProps> & HTMLProps<HTMLInputElement>
) {
  const state = useToggleState(props);
  const ref = useRef(null);
  const { inputProps } = useCheckbox(props, state, ref);

  return (
    <input
      {...inputProps}
      // Weird issue with react-aria and tanstack with .checked
      {...(props.onClick
        ? {
            onClick: props.onClick,
          }
        : {})}
      ref={ref}
    />
  );
}

function AccessibleButton(
  props: AriaButtonProps & HTMLProps<HTMLButtonElement>
) {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);
  const { children } = props;

  return (
    <button {...buttonProps} className={`${props.className}`} ref={ref}>
      {children}
    </button>
  );
}
