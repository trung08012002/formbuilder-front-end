import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { MdOutlineWarning } from 'react-icons/md';
import { Box, Text } from '@mantine/core';

import { Button } from '@/atoms/Button';
import {
  useAddMemberMutation,
  useCreateTeamMutation,
  useDeleteTeamMutation,
  useGetMyTeamsQuery,
  useRemoveMemberMutation,
  useUpdateTeamMutation,
} from '@/redux/api/teamApi';
import { ErrorResponse, type ModalType, ModalTypes } from '@/types';
import { toastify } from '@/utils';

import { ConfirmationModal } from '../ComfirmationModal';
import { ManageFolderModal } from '../ManageFolderModal';
import { ManageMemberModal } from '../ManageMemberModal';
import { ManageTeamModal } from '../ManageTeamModal';
import { TeamList } from '../TeamList';

interface TeamListProps {
  setFolderName: (folderName: string) => void;
  setFolderId: (folderId: number) => void;
  folderId: number;
  folderName: string;
}

export const TeamGroup = ({
  setFolderName,
  setFolderId,
  folderId,
  folderName,
}: TeamListProps) => {
  const [teamName, setTeamName] = useState<string>('');
  const [teamId, setTeamId] = useState<number>(0);
  const [modalType, setModalType] = useState<ModalType | ''>('');

  const [addMember, { isLoading: isAddMemberLoading }] = useAddMemberMutation();
  const [removeMember, { isLoading: isRemoveMemberLoading }] =
    useRemoveMemberMutation();

  const { data: teamList, isLoading: isTeamLoading } = useGetMyTeamsQuery();

  const [createTeam, { isLoading: isTeamCreating }] = useCreateTeamMutation();
  const [updateTeam, { isLoading: isTeamUpdating }] = useUpdateTeamMutation();
  const [deleteTeam, { isLoading: isTeamDeleting }] = useDeleteTeamMutation();

  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType('');

  const handleInviteMember = (value: { email: string }) => {
    addMember({ id: teamId, email: value.email }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        closeModal();
        return;
      }
      if (res.error as ErrorResponse)
        toastify.displayError((res.error as ErrorResponse).message as string);
    });
  };

  const handleRemoveMember = (id: number) => {
    removeMember({ id: teamId, memberIds: [id] }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        closeModal();
        return;
      }
      if (res.error as ErrorResponse)
        toastify.displayError((res.error as ErrorResponse).message as string);
    });
  };

  const handleCreateTeam = () => {
    createTeam({ name: teamName }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        closeModal();
        return;
      }
      if (res.error as ErrorResponse)
        toastify.displayError((res.error as ErrorResponse).message as string);
    });
  };

  const handleUpdateTeam = () => {
    updateTeam({ id: teamId, data: { name: teamName } }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        closeModal();
        return;
      }
      if (res.error as ErrorResponse)
        toastify.displayError((res.error as ErrorResponse).message as string);
    });
  };

  const handleDeleteTeam = () => {
    deleteTeam({ id: teamId }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        closeModal();
        return;
      }
      if (res.error as ErrorResponse)
        toastify.displayError((res.error as ErrorResponse).message as string);
    });
  };

  const onClickContinue = () => {};

  //TODO: handle continue button when create new folder
  return (
    <div className='flex flex-col gap-2'>
      <Text className='font-bold'>MY TEAMS</Text>
      <TeamList
        modalType={modalType}
        setModalType={setModalType}
        teamList={teamList}
        isLoading={isTeamLoading}
        setTeamName={setTeamName}
        setTeamId={setTeamId}
        setFolderName={setFolderName}
        setFolderId={setFolderId}
        folderId={folderId}
        folderName={folderName}
      />
      <Button
        className='font-bold text-slate-500 hover:bg-slate-200 hover:text-slate-500'
        onClick={() => {
          openModal(ModalTypes.CREATE_TEAM);
          setTeamName('');
        }}
        justify='flex-start'
        variant='subtle'
        leftSection={<FaPlusCircle className='size-4' />}
        title='Create a new team'
      />
      <ManageMemberModal
        teamList={teamList}
        teamId={teamId}
        opened={modalType === ModalTypes.MANAGE_TEAM}
        onClose={closeModal}
        handleInviteMember={handleInviteMember}
        handleRemoveMember={handleRemoveMember}
        isLoading={isAddMemberLoading || isRemoveMemberLoading}
      />
      <ManageFolderModal
        opened={modalType === ModalTypes.CREATE_FOLDER_IN_TEAM}
        onClose={closeModal}
        onClickCancel={closeModal}
        onClickSubmit={onClickContinue}
        setFolderName={setFolderName}
        isLoading={false}
      />
      <ManageTeamModal
        opened={
          modalType === ModalTypes.UPDATE_TEAM ||
          modalType === ModalTypes.CREATE_TEAM
        }
        teamName={teamName}
        teamId={modalType === ModalTypes.CREATE_TEAM ? undefined : teamId}
        onClose={closeModal}
        onClickBack={closeModal}
        onClickSubmit={
          modalType === ModalTypes.CREATE_TEAM
            ? handleCreateTeam
            : handleUpdateTeam
        }
        setTeamName={setTeamName}
        isLoading={isTeamCreating || isTeamUpdating}
      />
      <ConfirmationModal
        body={
          <Box className='flex flex-col items-center px-10'>
            <MdOutlineWarning className='size-28 text-error' />
            <Text size='lg' className='font-bold'>
              Delete teams
            </Text>
            <Text className='text-center'>
              Are you sure you want to delete selected team? <br /> This team
              and all folders will be removed.
            </Text>
          </Box>
        }
        opened={modalType === ModalTypes.DELETE_TEAM}
        onClose={closeModal}
        onClickBack={closeModal}
        onClickConfirm={handleDeleteTeam}
        isLoading={isTeamDeleting}
      />
    </div>
  );
};
