import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Group,
  LoadingOverlay,
  MantineSize,
  Modal as MantineModal,
  ModalProps as MantineModalProps,
} from '@mantine/core';

import { Button, ButtonProps } from '@/atoms/Button';

interface ConfirmationModal extends MantineModalProps {
  size?: MantineSize;
  body: ReactNode;
  isLoading: boolean;
  onClickBack: () => void;
  onClickConfirm: () => void;
  backButtonProps?: ButtonProps;
  confirmButtonProps?: ButtonProps;
}

export const ConfirmationModal = ({
  size = 'xl',
  body,
  onClickBack,
  onClickConfirm,
  isLoading,
  backButtonProps,
  confirmButtonProps,
  ...props
}: ConfirmationModal) => {
  const { t } = useTranslation();

  return (
    <MantineModal {...props} centered size={size}>
      <Box pos='relative'>
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'green' }}
        />
        {body}
        <Group className='mt-5 justify-between'>
          <Button
            onClick={onClickBack}
            className='font-bold'
            title={t('back')}
            color='gray'
            variant='outline'
            {...backButtonProps}
          />
          <Button
            onClick={onClickConfirm}
            color='error'
            className='font-bold'
            title={t('confirm')}
            {...confirmButtonProps}
          />
        </Group>
      </Box>
    </MantineModal>
  );
};
