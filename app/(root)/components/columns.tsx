'use client';

import { ColumnDef } from '@tanstack/react-table';

import CellAction from './cell-action';

export type Nota = {
  id: string;
  values: Record<string, any>;
};

export type NotaColumn = {
  id: string;
  dari: string;
  kepada: string;
  notaDinas: string;
};

export const columns: ColumnDef<NotaColumn>[] = [
  {
    accessorKey: 'notaDinas',
    header: 'No. Nota Dinas',
  },
  {
    accessorKey: 'dari',
    header: 'Dari',
  },
  {
    accessorKey: 'kepada',
    header: 'Kepada',
  },

  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
