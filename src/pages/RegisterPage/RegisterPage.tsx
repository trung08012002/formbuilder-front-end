import { Image } from '@mantine/core';

import { UnSignedHeader } from '@/atoms/UnsignedHeader';
import { RegisterForm, RegisterSchema } from '@/organisms/RegisterForm';

export const RegisterPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (values: RegisterSchema) => {
    // TODO: submit for reigster
  };

  return (
    <div className='h-screen w-screen '>
      <div className='h-headerHeight px-4 pt-4'>
        <UnSignedHeader />
      </div>
      <div className='flex h-contentHeight items-center  justify-center'>
        <div className='mr-12 w-1/5'>
          <Image radius='md' w='auto' fit='contain' src='./images/girl.jpeg' />
        </div>
        <div className='h-[440px] w-[400px] rounded border px-3  py-2 shadow-md'>
          <RegisterForm onSubmit={onSubmit} />
        </div>
        <div className='ml-12 w-1/5'>
          <Image radius='md' w='auto' fit='contain' src='./images/girl2.jpeg' />
        </div>
      </div>
    </div>
  );
};
