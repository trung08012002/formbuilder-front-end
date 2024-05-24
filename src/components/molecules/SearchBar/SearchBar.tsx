import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { ActionIcon, TextInput } from '@mantine/core';

import { DEFAULT_PAGE_SIZE } from '@/constants/defaultFormsParams';
import { GetTemplatesParams } from '@/types';

export interface SearchBarProps {
  placeholder?: string;
  setParams: React.Dispatch<React.SetStateAction<GetTemplatesParams>>;
  className?: string;
}

export const SearchBar = (props: SearchBarProps) => {
  const {
    placeholder = 'Search templates...',
    setParams,
    className = 'bg-slate-200 text-slate-800 w-[390px] px-1 grow-1 lg:shrink-0 lg:px-6',
  } = props;
  const [searchValue, setSearchValue] = useState<string>(() => '');
  const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(() => event.target.value);
  };
  const handleOnClick = () => {
    setParams((prevState: GetTemplatesParams) => ({
      ...prevState,
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      search: searchValue,
      categoryId: -1,
    }));
  };

  return (
    <div className='flex items-center justify-center gap-2'>
      <TextInput
        classNames={{ input: className }}
        placeholder={placeholder}
        size='lg'
        value={searchValue}
        onChange={handleSearchValue}
      />
      <ActionIcon size='xl' onClick={handleOnClick}>
        <FaSearch />
      </ActionIcon>
    </div>
  );
};
