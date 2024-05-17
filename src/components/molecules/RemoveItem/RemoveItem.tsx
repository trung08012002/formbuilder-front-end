import { RiDeleteBinFill } from 'react-icons/ri';
import { Box, Text } from '@mantine/core';

interface InteractiveIconProps {
  id: string;
  removeItem: (id: string) => void;
}

export const RemoveItem = (props: InteractiveIconProps) => {
  const { id, removeItem } = props;
  const handleRemoveItem = () => {
    removeItem(id);
  };

  return (
    <Box
      onClick={handleRemoveItem}
      className='group absolute bottom-[50%] left-[100%] mb-[-22px] flex translate-y-[50%] cursor-pointer items-center justify-center gap-2 rounded-full bg-error p-2 text-white'
    >
      <RiDeleteBinFill className='size-5' />
      <Text className='hidden pr-1 text-sm group-hover:inline-block'>
        Remove
      </Text>
    </Box>
  );
};
