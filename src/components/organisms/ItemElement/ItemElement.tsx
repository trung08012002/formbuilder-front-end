import { Text } from '@mantine/core';

interface ItemElementProps {
  icon: React.ReactNode;
  text: string;
}

export const ItemElement = (props: ItemElementProps) => {
  const { icon, text } = props;

  return (
    <div className='box-shadow-[0_1px_4px_rgba(0, 0, 0, 0.16)] flex h-full w-full cursor-pointer flex-col items-center gap-2 rounded-md border border-white bg-white px-[3px] pb-[6px] pt-3 shadow hover:shadow-md hover:shadow-gray-400/50'>
      <div
        className='rounded border-[0.5px] bg-gray-50 p-1'
        style={{
          color: 'rgb(100, 116, 139)',
          background: 'rgb(248, 250, 252)',
          borderColor: 'rgb(226, 232, 240)',
        }}
      >
        {icon}
      </div>
      <Text size='xs' className='overflow-clip' lineClamp={1}>
        {text}
      </Text>
    </div>
  );
};
