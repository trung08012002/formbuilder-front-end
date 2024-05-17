import { useMemo, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoCloseOutline } from 'react-icons/io5';
import { ActionIcon, Box, Group, Stack, Text, TextInput } from '@mantine/core';

import { ElementChartGroupType, ElementChartList } from '@/configs';
import { ChartCustomType } from '@/types';
import { cn } from '@/utils';

import { ItemElement } from '../ItemElement';

const elementList = ElementChartList as ElementChartGroupType[];
interface BuildChartLeftBarProps {
  setCurrentElementType: (element: ChartCustomType) => void;
}

const ELEMENT_ICON_SIZE = 25;

export const BuildChartLeftBar = ({
  setCurrentElementType,
}: BuildChartLeftBarProps) => {
  const [searchValue, setSearchValue] = useState('');

  const handleDrop = (elementType: ChartCustomType) => {
    setCurrentElementType(elementType);
  };
  const handleOnChangeSearchValue = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchValue(e.target.value);
  };

  const filteredElements = useMemo(
    () =>
      elementList
        .filter(
          (elements) =>
            elements.elements.findIndex((element) =>
              element.element.type
                .toLowerCase()
                .includes(searchValue.toLowerCase()),
            ) !== -1,
        )
        .map((elements: ElementChartGroupType) => ({
          title: elements.title,
          elements: elements.elements.filter((element) =>
            element.element.type
              .toLowerCase()
              .includes(searchValue.toLowerCase()),
          ),
        })),
    [searchValue],
  );

  return (
    <div className='flex h-full flex-col justify-start overflow-auto pt-4'>
      <div className='z-10 -mb-[10px] flex items-center gap-2 border-b border-transparent bg-gray-50 px-3 pb-[10px] transition duration-200'>
        <div className='w-full'>
          <TextInput
            value={searchValue}
            onChange={handleOnChangeSearchValue}
            placeholder='Search fields'
            size='md'
            leftSection={<CiSearch size={16} />}
            rightSection={
              <ActionIcon
                variant='transparent'
                size='lg'
                className={cn('invisible text-gray-400 hover:text-gray-500', {
                  visible: searchValue,
                })}
              >
                <IoCloseOutline size={18} />
              </ActionIcon>
            }
          />
        </div>
      </div>
      <div className='flex h-full flex-col overflow-hidden overflow-y-scroll px-3 pb-6'>
        {filteredElements.map((elementType, index) => (
          <Stack key={`category-${index}`} className='gap-0'>
            <Box className='flex p-2 '>
              <Text className='mt-6 text-sm font-medium text-gray-400'>
                {elementType.title}
              </Text>
            </Box>
            <Box className='mt-3 grid grid-cols-2 gap-2 gap-y-4 lg:grid-cols-2'>
              {elementType.elements.map(({ element }, index) => (
                <Box key={`element-${index}`}>
                  <Group
                    className='group cursor-move '
                    draggable={true}
                    unselectable='on'
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', '');
                      handleDrop(element.type);
                    }}
                  >
                    <ItemElement
                      icon={<element.icon size={ELEMENT_ICON_SIZE} />}
                      text={element.type}
                    />
                  </Group>
                </Box>
              ))}
            </Box>
          </Stack>
        ))}
      </div>
    </div>
  );
};
