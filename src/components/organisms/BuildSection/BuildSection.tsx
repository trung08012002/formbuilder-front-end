import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mantine/core';
import { Form, Formik } from 'formik';
import _isEqual from 'lodash.isequal';

import { PATH } from '@/constants/routes';
import { useBuildFormContext } from '@/contexts';
import { SaveButton } from '@/molecules/SaveButton';
import {
  useCreateFormInFolderMutation,
  useCreateFormInFolderOfTeamMutation,
  useCreateFormInTeamMutation,
  useCreateFormMutation,
  useGetFormDetailsQuery,
  useUpdateFormMutation,
} from '@/redux/api/formApi';
import { useUploadImageMutation } from '@/redux/api/imageApi';
import { ElementType, ErrorResponse } from '@/types';
import { toastify } from '@/utils';
import { separateFields } from '@/utils/seperates';

import { BuildFormLeftbar } from '../BuildFormLeftbar';
import { FormContainer } from '../FormContainer';

const STRETCH_BUILD_FORM_LEFT_BAR = 3;

const STRETCH_FORM_CONTAINER = 9;

export const BuildSection = () => {
  const { form, isEditForm, toggledRightbar } = useBuildFormContext();
  const { id: formId } = useParams();

  const location = useLocation();
  let teamId: number;
  let folderId: number;

  if (!formId && location.state) {
    teamId = location.state.teamId;
    folderId = location.state.folderId;
  }

  const [currentElementType, setCurrentElementType] = useState<ElementType>();
  const [currentLogoFile, setCurrentLogoFile] = useState<File>();
  const [createForm, { isLoading: isCreatingForm }] = useCreateFormMutation();
  const [createFormInFolder, { isLoading: isCreatingFormInFolder }] =
    useCreateFormInFolderMutation();
  const [createFormInTeam, { isLoading: isCreatingFormInTeam }] =
    useCreateFormInTeamMutation();
  const [
    createFormInFolderOfTeam,
    { isLoading: isCreatingFormInFolderOfTeam },
  ] = useCreateFormInFolderOfTeamMutation();
  const [updateForm, { isLoading: isUpdatingForm }] = useUpdateFormMutation();
  const [uploadImage, { isLoading: isUploadingImage }] =
    useUploadImageMutation();
  const navigate = useNavigate();

  const { data: formData, isLoading: isLoadingGetFormDetails } =
    useGetFormDetailsQuery({ id: formId || '' }, { skip: !formId });

  const handleCreateForm = () => {
    const filteredForm = separateFields(form);
    if (currentLogoFile) {
      return uploadImage(currentLogoFile).then((imgRes) => {
        if ('data' in imgRes) {
          const logoUrl = imgRes.data.data.url;

          return createForm({
            ...filteredForm,
            logoUrl,
          }).then((res) => {
            if ('data' in res) {
              toastify.displaySuccess(res.data.message);
              return navigate(`${PATH.BUILD_FORM_PAGE}/${res.data.data.id}`);
            }
            return toastify.displayError((res.error as ErrorResponse).message);
          });
        }
        return toastify.displayError((imgRes.error as ErrorResponse).message);
      });
    }

    return createForm(filteredForm).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message);
        return navigate(`${PATH.BUILD_FORM_PAGE}/${res.data.data.id}`);
      }
      return toastify.displayError((res.error as ErrorResponse).message);
    });
  };

  const handleCreateFormInFolder = (folderId: number) => {
    const filteredForm = separateFields(form);
    if (currentLogoFile) {
      return uploadImage(currentLogoFile).then((imgRes) => {
        if ('data' in imgRes) {
          const logoUrl = imgRes.data.data.url;

          return createFormInFolder({
            folderId,
            data: {
              ...filteredForm,
              logoUrl,
            },
          }).then((res) => {
            if ('data' in res) {
              toastify.displaySuccess(res.data.message);
              return navigate(`${PATH.BUILD_FORM_PAGE}/${res.data.data.id}`);
            }
            return toastify.displayError((res.error as ErrorResponse).message);
          });
        }
        return toastify.displayError((imgRes.error as ErrorResponse).message);
      });
    }

    return createFormInFolder({ folderId, data: filteredForm }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message);
        return navigate(`${PATH.BUILD_FORM_PAGE}/${res.data.data.id}`);
      }
      return toastify.displayError((res.error as ErrorResponse).message);
    });
  };

  const handleCreateFormInTeam = (teamId: number) => {
    const filteredForm = separateFields(form);
    if (currentLogoFile) {
      return uploadImage(currentLogoFile).then((imgRes) => {
        if ('data' in imgRes) {
          const logoUrl = imgRes.data.data.url;

          return createFormInTeam({
            teamId,
            data: {
              ...filteredForm,
              logoUrl,
            },
          }).then((res) => {
            if ('data' in res) {
              toastify.displaySuccess(res.data.message);
              return navigate(`${PATH.BUILD_FORM_PAGE}/${res.data.data.id}`);
            }
            return toastify.displayError((res.error as ErrorResponse).message);
          });
        }
        return toastify.displayError((imgRes.error as ErrorResponse).message);
      });
    }

    return createFormInTeam({ teamId, data: filteredForm }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message);
        return navigate(`${PATH.BUILD_FORM_PAGE}/${res.data.data.id}`);
      }
      return toastify.displayError((res.error as ErrorResponse).message);
    });
  };

  const handleCreateFormInFolderOfTeam = (folderId: number, teamId: number) => {
    const filteredForm = separateFields(form);
    if (currentLogoFile) {
      return uploadImage(currentLogoFile).then((imgRes) => {
        if ('data' in imgRes) {
          const logoUrl = imgRes.data.data.url;

          return createFormInFolderOfTeam({
            folderId,
            teamId,
            data: {
              ...filteredForm,
              logoUrl,
            },
          }).then((res) => {
            if ('data' in res) {
              toastify.displaySuccess(res.data.message);
              return navigate(`${PATH.BUILD_FORM_PAGE}/${res.data.data.id}`);
            }
            return toastify.displayError((res.error as ErrorResponse).message);
          });
        }
        return toastify.displayError((imgRes.error as ErrorResponse).message);
      });
    }

    return createFormInFolderOfTeam({
      folderId,
      teamId,
      data: filteredForm,
    }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message);
        return navigate(`${PATH.BUILD_FORM_PAGE}/${res.data.data.id}`);
      }
      return toastify.displayError((res.error as ErrorResponse).message);
    });
  };

  const handleCreateFormBasedOnIds = () => {
    if (folderId === undefined && teamId === undefined) {
      return handleCreateForm();
    }
    if (teamId === undefined) {
      return handleCreateFormInFolder(folderId);
    }
    if (folderId === undefined) {
      return handleCreateFormInTeam(teamId);
    }
    return handleCreateFormInFolderOfTeam(folderId, teamId);
  };

  const handleUpdateForm = (formId: number) => {
    const filteredForm = separateFields(form);
    if (currentLogoFile) {
      return uploadImage(currentLogoFile).then((imgRes) => {
        if ('data' in imgRes) {
          const logoUrl = imgRes.data.data.url;

          return updateForm({
            id: formId,
            data: {
              ...filteredForm,
              logoUrl,
            },
          }).then((res) => {
            if ('data' in res) {
              toastify.displaySuccess(res.data.message);
              return;
            }

            return toastify.displayError((res.error as ErrorResponse).message);
          });
        }

        return toastify.displayError((imgRes.error as ErrorResponse).message);
      });
    }
    return updateForm({
      id: formId,
      data: filteredForm,
    }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message);
        return;
      }
      return toastify.displayError((res.error as ErrorResponse).message);
    });
  };

  return (
    <Formik
      initialValues={{}}
      validateOnBlur={true}
      validateOnChange={false}
      onSubmit={() => {
        isEditForm ? handleUpdateForm(+formId!) : handleCreateFormBasedOnIds();
      }}
    >
      <Form className='h-full w-full'>
        <Box className='relative flex h-full w-full bg-malachite-50'>
          <Box flex={STRETCH_BUILD_FORM_LEFT_BAR}>
            <Box className='flex h-mainHeight min-w-[180px] max-w-[226px] flex-col justify-between border-l-[0.5px] border-r-[0.5px] border-gray-300 bg-gray-50 lg:min-w-[270px] lg:max-w-[300px]'>
              <BuildFormLeftbar setCurrentElementType={setCurrentElementType} />
            </Box>
          </Box>
          <Box flex={STRETCH_FORM_CONTAINER} className='overflow-auto'>
            <FormContainer
              isLoading={
                isLoadingGetFormDetails ||
                isCreatingForm ||
                isCreatingFormInFolder ||
                isCreatingFormInTeam ||
                isCreatingFormInFolderOfTeam ||
                isUpdatingForm ||
                isUploadingImage
              }
              isDisabled={
                isCreatingForm ||
                isCreatingFormInFolder ||
                isCreatingFormInFolderOfTeam ||
                isUpdatingForm
              }
              currentElementType={currentElementType!}
              setCurrentLogoFile={setCurrentLogoFile}
            />
            {toggledRightbar || (
              <SaveButton
                isLoading={
                  isCreatingForm ||
                  isCreatingFormInFolder ||
                  isCreatingFormInFolderOfTeam ||
                  isUpdatingForm ||
                  isUploadingImage
                }
                canSave={!isEditForm || !_isEqual(formData, form)}
              />
            )}
          </Box>
        </Box>
      </Form>
    </Formik>
  );
};
