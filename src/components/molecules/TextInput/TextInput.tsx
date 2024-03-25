import { useEffect } from 'react';
import {
  TextInput as TextInputMantine,
  TextInputProps as TextInputMantineProps,
} from '@mantine/core';
import { FieldInputProps, FieldMetaProps, FormikErrors } from 'formik';

import { cn } from '@/utils/cn';

interface TextInputProps extends Omit<TextInputMantineProps, 'form'> {
  classNameError?: string;
  classNameWrapper?: string;
  field: FieldInputProps<string>;
  form: {
    touched: Record<string, boolean>;
    errors: Record<string, string>;
    setFieldValue: (
      field: string,
      value: unknown,
      shouldValidate?: boolean,
    ) => Promise<void | FormikErrors<unknown>>;
  };
  meta: FieldMetaProps<string>;
  classNameLabel?: string;
}

export const TextInput = (props: TextInputProps) => {
  const {
    field,
    classNameWrapper,
    form: { errors, touched, setFieldValue },
    classNameError,
    classNameLabel,
    ...rest
  } = props;

  useEffect(() => {
    if (rest.defaultValue) {
      setFieldValue(field.name, rest.defaultValue);
      return;
    }
    setFieldValue(field.name, '');
  }, [field.name, rest.defaultValue, setFieldValue]);

  return (
    <div className={cn('flex w-full flex-col', classNameWrapper)}>
      <TextInputMantine
        {...field}
        {...rest}
        classNames={{
          label: cn('mb-2', classNameLabel),
        }}
      />
      <div className={cn('mt-1 text-xs text-red-600', classNameError)}>
        {touched[field.name] && errors[field.name]}
      </div>
    </div>
  );
};
