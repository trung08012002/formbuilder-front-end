import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mantine/core';
import _isEqual from 'lodash.isequal';

import { PATH } from '@/constants/routes';
import { ElementLayoutProvider, useBuildFormContext } from '@/contexts';
import { SaveButton } from '@/molecules/SaveButton';
import { ScrollToTopButton } from '@/molecules/ScrollToTopButton';
import {
  useCreateFormMutation,
  useGetFormDetailsQuery,
  useUpdateFormMutation,
} from '@/redux/api/formApi';
import { useUploadImageMutation } from '@/redux/api/imageApi';
import { ErrorResponse } from '@/types';
import { toastify } from '@/utils';

import { BuildFormLeftbar } from '../BuildFormLeftbar';
import { FormContainer } from '../FormContainer';

export const BuildSection = () => {
  const { form, toggledLeftbar, isEditForm, toggledRightbar } =
    useBuildFormContext();

  const [currentElementType, setCurrentElementType] = useState<string>();
  const [currentLogoFile, setCurrentLogoFile] = useState<File>();
  const [createForm, { isLoading: isCreatingForm }] = useCreateFormMutation();
  const [updateForm, { isLoading: isUpdatingForm }] = useUpdateFormMutation();
  const [uploadImage, { isLoading: isUploadingImage }] =
    useUploadImageMutation();
  const navigate = useNavigate();
  const { id: formId } = useParams();

  const { data: formData } = useGetFormDetailsQuery(
    { id: formId || '' },
    { skip: !formId },
  );

  const handleCreateForm = () => {
    if (currentLogoFile) {
      return uploadImage(currentLogoFile).then((imgRes) => {
        if ('data' in imgRes) {
          const logoUrl = imgRes.data.data.url;

          return createForm({
            ...form,
            logoUrl,
          }).then((res) => {
            if ('data' in res) {
              toastify.displaySuccess(res.data.message as string);
              return navigate(PATH.OVERVIEW_PAGE);
            }

            return toastify.displayError(
              (res.error as ErrorResponse).message as string,
            );
          });
        }

        return toastify.displayError((imgRes.error as ErrorResponse).message);
      });
    }
    return createForm(form).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        return navigate(PATH.OVERVIEW_PAGE);
      }
      return toastify.displayError(
        (res.error as ErrorResponse).message as string,
      );
    });
  };

  const handleUpdateForm = (formId: number) => {
    if (currentLogoFile) {
      return uploadImage(currentLogoFile).then((imgRes) => {
        if ('data' in imgRes) {
          const logoUrl = imgRes.data.data.url;

          return updateForm({
            id: formId,
            data: {
              ...form,
              logoUrl,
            },
          }).then((res) => {
            if ('data' in res) {
              toastify.displaySuccess(res.data.message as string);
              return navigate(PATH.OVERVIEW_PAGE);
            }

            return toastify.displayError(
              (res.error as ErrorResponse).message as string,
            );
          });
        }

        return toastify.displayError((imgRes.error as ErrorResponse).message);
      });
    }
    return updateForm({
      id: formId,
      data: form,
    }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        return navigate(PATH.OVERVIEW_PAGE);
      }
      return toastify.displayError(
        (res.error as ErrorResponse).message as string,
      );
    });
  };

  return (
    <Box className='relative flex h-full w-full bg-malachite-50'>
      <Box
        flex={toggledLeftbar ? 3 : 0}
        className='transition-all duration-200 ease-linear'
      >
        <BuildFormLeftbar setCurrentElementType={setCurrentElementType} />
      </Box>
      <Box
        flex={toggledLeftbar ? 9 : 1}
        className='transition-all duration-200 ease-linear'
      >
        <ElementLayoutProvider>
          <FormContainer
            currentElementType={currentElementType!}
            setCurrentLogoFile={setCurrentLogoFile}
          />
        </ElementLayoutProvider>
      </Box>
      {toggledRightbar || (
        <SaveButton
          className='absolute right-10 top-10'
          handleSave={() =>
            isEditForm ? handleUpdateForm(+formId!) : handleCreateForm()
          }
          isLoading={isCreatingForm || isUpdatingForm || isUploadingImage}
          canSave={!isEditForm || !_isEqual(formData, form)}
        />
      )}
      <ScrollToTopButton className='fixed bottom-14 right-10'></ScrollToTopButton>
    </Box>
  );
};
