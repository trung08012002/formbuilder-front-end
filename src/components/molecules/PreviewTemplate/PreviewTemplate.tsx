import { useState } from 'react';
import { Box, Stack } from '@mantine/core';
import { Form, Formik } from 'formik';

import { SubmissionConfirmation } from '@/organisms/SubmissionConfirmation';
import { FormRequest } from '@/types';

import { FormRenderUpdateComponent } from '../FormRenderUpdateComponent';

export interface PreviewTemplateProps {
  form: FormRequest;
}

export const PreviewTemplate = (props: PreviewTemplateProps) => {
  const { form } = props;
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  return (
    <Stack className='flex h-full w-full items-center justify-center overflow-y-scroll bg-malachite-50'>
      {isSuccess ? (
        <Box className='scale-90'>
          <SubmissionConfirmation />
        </Box>
      ) : (
        <Box className='w-full py-7'>
          <Formik
            validateOnBlur={true}
            validateOnChange={false}
            initialValues={{}}
            onSubmit={(values) => {
              setIsSuccess(!!values);
            }}
          >
            <Form>
              <FormRenderUpdateComponent form={form} />
            </Form>
          </Formik>
        </Box>
      )}
    </Stack>
  );
};
