import { useTranslation } from 'react-i18next';
import { FaFolderPlus } from 'react-icons/fa';
import { MdEditSquare } from 'react-icons/md';
import {
  ModalProps as MantineModalProps,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';

import { Modal } from '../Modal';

interface ManageFolderModalProps extends MantineModalProps {
  folderName?: string;
  folderId?: number;
  setFolderName: (arg0: string) => void;
  inputTitle?: string;
  onClickCancel: () => void;
  onClickSubmit: () => void;
  isLoading: boolean;
}

export const ManageFolderModal = ({
  folderName,
  folderId,
  setFolderName,
  onClickCancel,
  onClickSubmit,
  isLoading,
  ...props
}: ManageFolderModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      {...props}
      canSubmit={folderName !== ''}
      headerIcon={
        <>
          {folderId ? (
            <MdEditSquare className='text-white' />
          ) : (
            <FaFolderPlus className='text-white' />
          )}
        </>
      }
      headerTitle={folderId ? t('changeFolderName') : t('addFolderName')}
      body={
        <>
          <Stack className='gap-2 pb-[100px] pt-8'>
            <Text className='font-bold'>{t('folderName')}</Text>
            <TextInput
              value={folderName}
              placeholder={t('typeFolderNameHere')}
              onChange={(e) => setFolderName(e.target.value)}
            />
          </Stack>
        </>
      }
      onClickCancel={onClickCancel}
      onClickSubmit={onClickSubmit}
      isLoading={isLoading}
    />
  );
};
