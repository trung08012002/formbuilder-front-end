import { Box, Group, Text, TextInput } from '@mantine/core';

import { EmailConfig, EmailElement } from '@/types';

import { BaseElementProps } from '../FactoryElement';

export const BaseEmailElement = (props: BaseElementProps<EmailElement>) => {
  const { item, updateItem, handleConfig } = props;

  const handleChange =
    (key: keyof EmailConfig) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleConfig({
        ...item.config,
        [key]: event.currentTarget.value,
      });
      updateItem({
        ...item,
        config: {
          ...item.config,
          [key]: event.currentTarget.value,
        },
      });
    };

  return (
    <Group>
      <Box className='w-full'>
        <Text className='mb-2 text-base font-[500]'>
          {item.config.fieldLabel}
          {item.config.required && (
            <span className='ml-2 text-lg text-red-500'>*</span>
          )}
        </Text>
        <TextInput name='fieldLabel' required={item.config.required} readOnly />
        <TextInput
          autoComplete='off'
          name='sublabel'
          variant='unstyled'
          classNames={{
            input: 'text-xs font-thin text-slate-500',
          }}
          value={item.config.sublabel}
          onChange={handleChange('sublabel')}
        />
      </Box>
    </Group>
  );
};
