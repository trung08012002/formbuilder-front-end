import {
  TextInput as TextInputMatine,
  TextInputProps as TextInputMatineProps,
} from '@mantine/core';
import { FieldInputProps, FieldMetaProps } from 'formik';

import { cn } from '@/utils/cn';

interface TextInputProps extends Omit<TextInputMatineProps, 'form'> {
  classNameError?: string;
  classNameInput?: string;
  field: FieldInputProps<string>;
  form: {
    touched: Record<string, boolean>;
    errors: Record<string, string>;
  };
  meta: FieldMetaProps<string>;
}

export const TextInput = (props: TextInputProps) => {
  const {
    field,
    form: { errors, touched },
    classNameError,
    ...rest
  } = props;

  return (
    <div className='flex flex-col'>
      <TextInputMatine {...field} {...rest} />
      <div
        className={cn(
          'mt-1 min-h-[1.25rem] text-sm text-red-600',
          classNameError,
        )}
      >
        {touched[field.name] && errors[field.name]}
      </div>
    </div>
  );
};
