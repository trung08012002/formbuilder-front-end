import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Center } from '@mantine/core';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';

import { Button } from '@/atoms/Button';
import { PATH } from '@/constants/routes';
import { PasswordInput } from '@/molecules/PasswordInput';
import { TextInput } from '@/molecules/TextInput';
import { signUpSchema } from '@/utils/schemas/signUpSchema';

export type SignupSchema = yup.InferType<typeof signUpSchema>;

interface SignupFormProps {
  onSubmit: (value: SignupSchema) => void;
}

export const SignupForm = (props: SignupFormProps) => {
  const { onSubmit } = props;
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur={true}
      validateOnChange={false}
      validationSchema={signUpSchema}
      onSubmit={onSubmit}
    >
      <Form className='h-full w-full'>
        <Field
          classNameWrapper='mb-2'
          name='username'
          label={t('username')}
          size='xs'
          component={TextInput}
        />
        <Field
          classNameWrapper='mb-2'
          name='email'
          label={t('email')}
          size='xs'
          component={TextInput}
        />
        <Field
          classNameWrapper='mb-2'
          name='password'
          label={t('password')}
          type='password'
          size='xs'
          component={PasswordInput}
        />
        <Field
          classNameWrapper='mb-2'
          name='confirmPassword'
          label={t('confirmPassword')}
          type='password'
          size='xs'
          component={PasswordInput}
        />

        <Center className='py-2'>
          <Button title={t('signUp')} type='submit' className='w-full' />
        </Center>
        <div className='mt-3 flex items-center justify-center text-xs'>
          <span>{t('haveAccount')}</span>
          <Link
            to={PATH.LOGIN_PAGE}
            className='ml-1 text-malachite-500  no-underline hover:font-medium hover:text-malachite-600'
          >
            {t('login')}
          </Link>
        </div>
      </Form>
    </Formik>
  );
};
