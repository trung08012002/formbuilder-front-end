import { Image } from '@mantine/core';

import { UnSignedHeader } from '@/atoms/UnsignedHeader';
import { LoginForm, LoginSchema } from '@/organisms/LoginForm';

export const LoginPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (values: LoginSchema) => {};

  return (
    <div className='h-screen w-screen'>
      <div className='h-headerHeight px-4 pt-4'>
        <UnSignedHeader />
      </div>
      <div className='flex h-contentHeight items-center justify-center'>
        <div className='mr-12 w-1/5'>
          <Image radius='md' w='auto' fit='contain' src='./images/girl.jpeg' />
        </div>
        <div className='h-[280px] w-[400px] rounded  border  px-6 py-2 shadow-md'>
          <LoginForm onSubmit={onSubmit} />
        </div>
        <div className='ml-12 w-1/5'>
          <Image radius='md' w='auto' fit='contain' src='./images/girl2.jpeg' />
        </div>
      </div>
    </div>
  );
};
