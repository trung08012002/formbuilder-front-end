import { Link } from 'react-router-dom';
import { Center } from '@mantine/core';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';

import { Button } from '@/atoms/Button';
import { TextInput } from '@/molecules/TextInput';
import { accountSchema } from '@/utils/schemas/rules';

const registerSchema = accountSchema.pick([
  'email',
  'password',
  'confirmPassword',
  'username',
]);

export type RegisterSchema = yup.InferType<typeof registerSchema>;

interface Props {
  onSubmit: (value: RegisterSchema) => void;
}
export const RegisterForm = (props: Props) => {
  const { onSubmit } = props;
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur={true}
      validateOnChange={false}
      validationSchema={registerSchema}
      onSubmit={onSubmit}
    >
      <Form className='h-full w-full'>
        <Field name='userName' label='User Name' component={TextInput} />
        <Field name='email' label='Email' component={TextInput} />
        <Field name='password' label='Password' component={TextInput} />
        <Field
          name='confirmPassword'
          label='Confirm Password'
          component={TextInput}
        />

        <Center>
          <Button title='Sign Up' type='submit' className='w-full' />
        </Center>
        <div className='mt-3 flex items-center justify-center text-xs'>
          <span className='text-gray-600'>You already have account?</span>
          <Link to='/login' className='text-green-8 ml-1'>
            Login
          </Link>
        </div>
      </Form>
    </Formik>
  );
};
