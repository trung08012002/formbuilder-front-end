import { ChangeEvent, forwardRef, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosAdd } from 'react-icons/io';
import {  useParams } from 'react-router-dom';
import {
  Box,
  Divider,
  Group,
  Image,
  LoadingOverlay,
  Stack,
} from '@mantine/core';

import { Button } from '@/atoms/Button';
import { MESSAGES } from '@/constants/messages';
import { useBuildFormContext, useElementLayouts } from '@/contexts';
import { useGetTemplateDetailsMutation } from '@/redux/api/templateApi';
import { ElementItem, ElementType } from '@/types';
import { toastify } from '@/utils';
import { createElement } from '@/utils/elements';

import { PropertiesRightbar } from '../PropertiesRightbar';
import { ResponsiveGridLayoutTemplate } from '../ResponseGridLayoutTemplate';

interface TemplateContainerProps {
  currentElementType?: ElementType;
  setCurrentLogoFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  isDisabled: boolean;
  isLoading: boolean;
}

export const TemplateContainer = forwardRef<
  HTMLDivElement,
  TemplateContainerProps
>(({ currentElementType, setCurrentLogoFile, isDisabled, isLoading }, ref) => {
  const { setForm, currentLogo, setCurrentLogo } = useBuildFormContext();

  const logoInputRef = useRef<HTMLInputElement>(null);

  const { t } = useTranslation();

  const { elements, setElements, edittingItem, setEdittingItem } =
    useElementLayouts();

  const handleClickAddLogo = () => {
    logoInputRef.current?.click();
  };

  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];

    if (!file.type.startsWith('image/')) {
      toastify.displayError(MESSAGES.ONLY_SUPPORT_IMAGE_FILE_TYPES);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Encoded = reader?.result?.toString() ?? '';
      setCurrentLogo(base64Encoded);
      setForm((prevState) => ({
        ...prevState,
        logoUrl: base64Encoded,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
      setCurrentLogoFile(file);
    }
    event.target.value = '';
  };
  const { id: templateId } = useParams();

  const [getTemplateDetails] = useGetTemplateDetailsMutation();
  useEffect(() => {
    if (!templateId) return;
    getTemplateDetails({
      templateId: Number(templateId),
      filter: true,
    }).then((template) => {
      if ('data' in template) {
        setCurrentLogo(template.data.logoUrl);
        setElements([
          ...elements,
          ...template.data.elements.map(
            (elementResponse) =>
              createElement(
                elementResponse.type,
                elementResponse.config,
              ) as unknown as ElementItem,
          ),
        ]);
      }
    });
  }, []);

  const updateItem = (item: ElementItem) => {
    setElements(
      elements.map((element) => {
        if (element.id !== edittingItem!.id) return element;
        return item;
      }),
    );
  };

  useEffect(() => {
    setForm((prevState) => ({
      ...prevState,
      elements: elements,
    }));
  }, [elements, setForm]);

  const handleConfig = (config: ElementItem['config']) => {
    setEdittingItem({ ...edittingItem, config: config } as ElementItem);
  };

  return (
    <Stack className='h-mainHeight py-7'>
      <Stack className='w-[65%] justify-between gap-7'>
        {currentLogo ? (
          <Group className='relative mx-auto'>
            <input
              type='file'
              ref={logoInputRef}
              onChange={(event) => handleLogoChange(event)}
              accept='image/*'
              className='hidden'
            />
            <Image
              src={currentLogo}
              className='h-36 w-72 flex-1 cursor-pointer object-cover'
              onClick={handleClickAddLogo}
            />
          </Group>
        ) : (
          <Divider
            size='sm'
            label={
              <>
                <input
                  type='file'
                  ref={logoInputRef}
                  onChange={(event) => handleLogoChange(event)}
                  accept='image/*'
                  className='hidden'
                />
                <Button
                  title={t('addYourLogo')}
                  variant='subtle'
                  color='gray'
                  leftSection={<IoIosAdd size={16} />}
                  onClick={handleClickAddLogo}
                  className='my-2 text-xs font-medium uppercase'
                />
              </>
            }
            labelPosition='center'
            variant='dashed'
            className='px-4'
          />
        )}
        <Box pos='relative' className='px-4'>
          <LoadingOverlay
            visible={isLoading}
            zIndex={80}
            overlayProps={{ radius: 'sm', blur: 2, className: 'scale-x-150' }}
            loaderProps={{ color: 'green' }}
          />
          <div ref={ref}>
            <ResponsiveGridLayoutTemplate
              currentElementType={currentElementType!}
              updateItem={updateItem}
              handleConfig={handleConfig}
              isDisabled={isDisabled}
            />
          </div>
        </Box>
        <PropertiesRightbar
          edittingItem={edittingItem!}
          updateItem={updateItem}
          handleConfig={handleConfig}
        />
      </Stack>
    </Stack>
  );
});
