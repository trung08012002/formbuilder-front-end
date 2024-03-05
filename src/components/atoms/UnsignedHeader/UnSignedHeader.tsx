import { useMatch } from 'react-router-dom';
import { Image } from '@mantine/core';

import { PATH } from '@/constants/route';

const HEIGHT_IMAGE = 50;

export const UnSignedHeader = () => {
  const isRegister = Boolean(useMatch(PATH.REGISTER_PAGE));

  return (
    <header>
      <div className='container '>
        <nav className='flex items-center'>
          <Image
            radius='md'
            h={HEIGHT_IMAGE}
            w='auto'
            fit='contain'
            src='./images/greenlogo.png'
            className='mb-10'
          />
          <div className='text-green-8 mb-3 ml-5 text-xl lg:text-2xl'>
            {isRegister ? 'Sign up' : 'Login'}
          </div>
        </nav>
      </div>
    </header>
  );
};
