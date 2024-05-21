import { useTranslation } from 'react-i18next';
import { Box, Image, Stack } from '@mantine/core';

import ThankYou from '@/assets/images/thankyou.png';

export const SubmissionConfirmation = () => {
  const { t } = useTranslation();

  return (
    <Box className='mx-auto w-[700px] rounded bg-white p-3 pb-10 shadow-[4px_4px_16px_-1px_rgba(0,0,0,0.1)]'>
      <Stack className='items-center justify-center gap-10'>
        <Image src={ThankYou} className='mt-6 w-[155px]' />
        <Stack className='items-center justify-center gap-2'>
          <span className='text-5xl font-semibold text-malachite-900'>
            {t('thankyou')}
          </span>
          <span className='text-center text-xl text-malachite-900 opacity-70'>
            {t('yourSubmissionHasBeenReceived')}
          </span>
        </Stack>
      </Stack>
    </Box>
  );
};
