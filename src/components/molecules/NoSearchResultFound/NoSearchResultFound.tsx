import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Divider } from '@mantine/core';

import { PATH } from '@/constants';

export interface NoSearchResultFoundProps {
  search: string;
}

export const NoSearchResultFound = (props: NoSearchResultFoundProps) => {
  const { search } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className='relative h-screen w-screen overflow-auto p-0'>
      <div className='border-gray-75 border-b px-2 pb-3 text-5xl text-gray-600 md:my-4'>
        {t('searchResults')}
      </div>
      <div className='-px-10 -mt-1'>
        <Divider my='md' />
      </div>
      <div className='flex h-fit w-full flex-col items-center px-3 py-10 text-center sm:px-10 sm:py-20'>
        <img
          width={60}
          height={72}
          loading='lazy'
          className='h-auto w-10'
          src='https://cdn01.jotfor.ms/form-templates/assets/img/no-results.svg'
          alt='no result icon'
        />
        <h4 className='mb-4 mt-8 text-2xl font-medium uppercase text-gray-600'>
          {t('noResultFound')}
        </h4>
        <p className='text-md mx-auto text-gray-600'>
          <Trans
            i18nKey='noFindAnyResults'
            values={{
              search: search,
            }}
            components={[<b />]}
          />
        </p>
      </div>

      <Box
        className='absolute bottom-0 left-0 right-0 z-[100] -ml-5 flex w-full transform 
         flex-col items-center justify-between gap-7 border-b border-t border-gray-600 
         bg-gray-300 px-5 py-10 duration-200 md:ml-0 md:mr-0 md:gap-5 md:border-l md:border-r
          md:py-6 lg:flex-row rtl:-mr-5'
      >
        <img
          width={41}
          height={39}
          loading='lazy'
          className='h-auto w-10 md:block'
          src='https://cdn.jotfor.ms/form-templates/assets/img/create-from-scratch.svg'
          alt='Create From Scratch Icon'
        />
        <div className='grow-1 flex flex-col items-center gap-4 text-center md:gap-1 lg:items-start lg:text-left lg:rtl:text-right'>
          <p className='text-xl text-gray-800'>{t('makeYourOwnForm')}</p>
          <p className='text-sm text-gray-600'>{t('createACustomForm')}</p>
        </div>
        <button
          onClick={() => navigate(PATH.BUILD_FORM_PAGE)}
          className='color-white text-md xs:w-auto flex items-center justify-center rounded-lg border border-gray-700 bg-gray-300 px-3 py-3 text-center font-medium duration-200 hover:bg-white hover:text-gray-700 xl:px-10 xl:text-lg'
        >
          {t('createFromScratch')}
        </button>
      </Box>
    </div>
  );
};
