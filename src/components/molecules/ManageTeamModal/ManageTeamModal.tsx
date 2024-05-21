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

interface ManageTeamModalProps extends MantineModalProps {
  teamName?: string;
  teamId?: number;
  setTeamName: (arg0: string) => void;
  onClickBack: () => void;
  onClickSubmit: () => void;
  isLoading: boolean;
}

export const ManageTeamModal = ({
  teamName,
  teamId,
  setTeamName,
  onClickSubmit,
  onClickBack,
  isLoading,
  ...props
}: ManageTeamModalProps) => {
  const { t } = useTranslation();
  return (
    <Modal
      canSubmit={teamName !== ''}
      {...props}
      headerIcon={
        <>
          {teamId ? (
            <MdEditSquare className='text-white' />
          ) : (
            <FaFolderPlus className='text-white' />
          )}
        </>
      }
      headerTitle={teamId ? t('changeTeamName') : t('addTeamName')}
      body={
        <>
          <Stack className='pb-16 pt-7'>
            <Text className='font-bold'>{t('teamName')}</Text>
            <TextInput
              value={teamName}
              placeholder={t('typeTeamNameHere')}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </Stack>
        </>
      }
      onClickCancel={onClickBack}
      onClickSubmit={onClickSubmit}
      isLoading={isLoading}
    />
  );
};
