import { useEffect } from 'react';
import {
  Textarea as TextareaMantine,
  TextareaProps as TextareaMantineProps,
} from '@mantine/core';
import {
  ErrorMessage,
  FieldInputProps,
  FieldMetaProps,
  FormikErrors,
} from 'formik';

import { cn } from '@/utils/cn';

interface TextareaProps extends Omit<TextareaMantineProps, 'form'> {
  handleChange?: (
    key: string,
  ) => (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  classNameError?: string;
  classNameWrapper?: string;
  nameElementField?: string;
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
  valueConfig: string;
}

export const Textarea = (props: TextareaProps) => {
  const {
    nameElementField,
    handleChange,
    field,
    form: { setFieldValue },
    classNameError,
    classNameWrapper,
    resize = 'vertical',
    ...rest
  } = props;

  useEffect(() => {
    if (rest.valueConfig) {
      setFieldValue(field.name, rest.valueConfig);
      return;
    }
    setFieldValue(field.name, '');
  }, [field.name, rest.valueConfig]);

  return (
    <div className={cn('flex flex-col', classNameWrapper)}>
      <TextareaMantine
        {...field}
        resize={resize}
        {...rest}
        onChange={(e) => {
          if (nameElementField) handleChange?.(nameElementField)(e);
        }}
      />
      <ErrorMessage
        name={field.name}
        render={(msg) => (
          <div className={cn('mt-1 text-xs text-red-600', classNameError)}>
            {msg}
          </div>
        )}
      />
    </div>
  );
};
