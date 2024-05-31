import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mantine/core';
import { Form, Formik } from 'formik';
import html2canvas from 'html2canvas';
import _isEqual from 'lodash.isequal';

import { useBuildFormContext, useElementLayouts } from '@/contexts';
import { SaveButton } from '@/molecules/SaveButton';
import { TemplateExtraInfo } from '@/pages/BuildTemplatePage';
import { useGetFormDetailsQuery } from '@/redux/api/formApi';
import { useUploadImageMutation } from '@/redux/api/imageApi';
import {
  useCreateTemplateMutation,
  useUpdateTemplateMutation,
} from '@/redux/api/templateApi';
import { ElementType, ErrorResponse } from '@/types';
import { toastify } from '@/utils';
import { separateFields } from '@/utils/seperates';

import { BuildFormLeftbar } from '../BuildFormLeftbar';
import { TemplateContainer } from '../TemplateContainer/TemplateContainer';

const STRETCH_BUILD_FORM_LEFT_BAR = 3;

const STRETCH_FORM_CONTAINER = 9;

export interface BuildTemplateSectionProps {
  templateExtraInfo: TemplateExtraInfo;
}

export const BuildTemplateSection = (props: BuildTemplateSectionProps) => {
  const { templateExtraInfo } = props;
  const { form, isEditForm, toggledRightbar } = useBuildFormContext();
  const { id: templateId } = useParams();
  const captureRef = useRef(null);
  const { setEdittingItem } = useElementLayouts();
  const [currentElementType, setCurrentElementType] = useState<ElementType>();
  const [currentLogoFile, setCurrentLogoFile] = useState<File>();
  const [createTemplate, { isLoading: isCreatingForm }] =
    useCreateTemplateMutation();

  const [updateTemplate, { isLoading: isUpdatingTemplate }] =
    useUpdateTemplateMutation();
  const [uploadImage, { isLoading: isUploadingImage }] =
    useUploadImageMutation();

  const { data: formData, isLoading: isLoadingGetFormDetails } =
    useGetFormDetailsQuery({ id: templateId || '' }, { skip: !templateId });

  const handleCapture = async () => {
    if (captureRef.current === null) return new File([], '');
    const canvas = await html2canvas(captureRef.current);
    const imgData = canvas.toDataURL('image/png');

    const byteString = atob(imgData.split(',')[1]);
    const mimeString = imgData.split(',')[0].split(':')[1].split(';')[0];
    const buffer = new ArrayBuffer(byteString.length);
    const data = new Uint8Array(buffer);
    for (let i = 0; i < byteString.length; i++) {
      data[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([buffer], { type: mimeString });
    const file = new File([blob], 'screenshot.png', {
      type: mimeString,
      lastModified: Date.now(),
    });
    return file;
  };

  const handleCreateTemplate = async () => {
    const filteredForm = separateFields(form);
    const previewImage = await handleCapture();
    if (currentLogoFile) {
      return uploadImage([currentLogoFile, previewImage]).then((imgRes) => {
        if ('data' in imgRes) {
          const logoUrl = imgRes.data.data.urls[0];
          const imagePreviewUrl = imgRes.data.data.urls[1];
          return createTemplate({
            ...filteredForm,
            ...templateExtraInfo,
            logoUrl,
            imagePreviewUrl,
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
    const res = await uploadImage([previewImage]);
    if ('data' in res) {
      return createTemplate({
        ...filteredForm,
        ...templateExtraInfo,
        imagePreviewUrl: res.data.data.urls[0],
      }).then((res) => {
        if ('data' in res) {
          toastify.displaySuccess(res.data.message);
          return;
        }
        return toastify.displayError((res.error as ErrorResponse).message);
      });
    }
  };

  const handleCreateTemplateBasedOnIds = () => handleCreateTemplate();

  const handleUpdateTemplate = async (formId: number) => {
    const filteredForm = separateFields(form);
    const previewImage = await handleCapture();
    if (currentLogoFile) {
      return uploadImage([currentLogoFile, previewImage]).then((imgRes) => {
        if ('data' in imgRes) {
          const logoUrl = imgRes.data.data.urls[0];
          const imagePreviewUrl = imgRes.data.data.urls[1];
          return updateTemplate({
            templateId: formId,
            data: {
              ...filteredForm,
              logoUrl,
              ...templateExtraInfo,
              imagePreviewUrl,
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
    const res = await uploadImage([previewImage]);
    if ('data' in res) {
      return updateTemplate({
        templateId: formId,
        data: {
          ...filteredForm,
          ...templateExtraInfo,
          imagePreviewUrl: res.data.data.urls[0],
        },
      }).then((res) => {
        if ('data' in res) {
          toastify.displaySuccess(res.data.message);
          return;
        }
        return toastify.displayError((res.error as ErrorResponse).message);
      });
    }
  };

  return (
    <Formik
      initialValues={{}}
      validateOnBlur={true}
      validateOnChange={false}
      onSubmit={() => {
        setEdittingItem(undefined);
        setTimeout(() => {
          isEditForm
            ? handleUpdateTemplate(+templateId!)
            : handleCreateTemplateBasedOnIds();
        }, 200);
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
            <TemplateContainer
              isLoading={
                isLoadingGetFormDetails ||
                isCreatingForm ||
                isUpdatingTemplate ||
                isUploadingImage
              }
              isDisabled={isCreatingForm || isUpdatingTemplate}
              currentElementType={currentElementType!}
              setCurrentLogoFile={setCurrentLogoFile}
              ref={captureRef}
            />
            {toggledRightbar || (
              <SaveButton
                isLoading={
                  isCreatingForm || isUpdatingTemplate || isUploadingImage
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
