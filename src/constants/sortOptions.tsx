import { ReactNode } from 'react';
import { FaArrowDownShortWide } from 'react-icons/fa6';
import { FaArrowUpShortWide } from 'react-icons/fa6';

export interface SortOption {
  field: string;
  sortDirection: string;
  title: string;
  icon: ReactNode;
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export const sortOptionList: SortOption[] = [
  {
    field: 'title',
    sortDirection: SortDirection.ASC,
    title: 'title',
    icon: <FaArrowUpShortWide />,
  },
  {
    field: 'title',
    sortDirection: SortDirection.DESC,
    title: 'title',
    icon: <FaArrowDownShortWide />,
  },
  {
    field: 'createdAt',
    sortDirection: SortDirection.ASC,
    title: 'dateCreated',
    icon: <FaArrowUpShortWide />,
  },
  {
    field: 'createdAt',
    sortDirection: SortDirection.DESC,
    title: 'dateCreated',
    icon: <FaArrowDownShortWide />,
  },
  {
    field: 'updatedAt',
    sortDirection: SortDirection.ASC,
    title: 'lastEdit',
    icon: <FaArrowUpShortWide />,
  },
  {
    field: 'updatedAt',
    sortDirection: SortDirection.DESC,
    title: 'lastEdit',
    icon: <FaArrowDownShortWide />,
  },
];
