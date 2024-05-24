import { useEffect, useState } from 'react';
import { Box, Image, LoadingOverlay, Stack, Text } from '@mantine/core';

import { BIG_Z_INDEX } from '@/constants';
import { FactoryElement } from '@/molecules/FactoryElement';
import { ResponsiveReactGridLayout } from '@/organisms/ResponsiveGridLayout';
import { ElementItem, FormRequest, FormResponse } from '@/types';
import { createElement } from '@/utils/elements';

interface FormRenderUpdateComponentProps {
  form?: FormResponse | FormRequest;
  isLoading?: boolean;
}

export const FormRenderUpdateComponent = ({
  form,
  isLoading,
}: FormRenderUpdateComponentProps) => {
  const [elements, setElements] = useState<ElementItem[]>([]);

  const handleOnChangeAnswer = (
    elementId: string,
    fieldId: string,
    value: string,
  ) => {
    const onChangingElement = elements.find(
      (element) => element.id === elementId,
    );
    const updatedEdittingField = onChangingElement!.fields.map((field) => {
      if (field.id !== fieldId) return field;
      return {
        id: fieldId,
        name: field.name,
        text: value,
      };
    });
    setElements(
      elements.map((element) => {
        if (element.id !== onChangingElement!.id) return element;
        return {
          ...onChangingElement,
          fields: updatedEdittingField,
        } as ElementItem;
      }),
    );
  };

  useEffect(() => {
    if (form) {
      const elementsForm = form.elements as ElementItem[];
      setElements(
        elementsForm.map(
          (element) =>
            createElement(
              element.type,
              element.config,
            ) as unknown as ElementItem,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  return (
    <div className='flex h-full w-full flex-col items-center'>
      {form?.logoUrl && (
        <Image
          src={form.logoUrl}
          className='mb-8 h-[140px] w-[360px] object-cover'
        />
      )}
      <Stack className='w-[80%] justify-between gap-7'>
        <Box pos='relative'>
          <LoadingOverlay
            visible={isLoading || !form}
            zIndex={BIG_Z_INDEX}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'green' }}
          />
          <div className='w-full rounded-md border border-solid border-slate-200 bg-white px-3 py-1 shadow-lg'>
            <Text className='mt-6 px-4 text-2xl font-bold'>{form?.title}</Text>
            <ResponsiveReactGridLayout
              rowHeight={30}
              isResizable={false}
              isDroppable={false}
              isDraggable={false}
            >
              {elements.map((element) => (
                <Box
                  key={element.id}
                  data-grid={element.gridSize}
                  className='flex w-full flex-col justify-center px-2'
                >
                  <FactoryElement
                    item={element}
                    isActive={false}
                    removeItem={() => {}}
                    updateItem={() => {}}
                    handleConfig={() => {}}
                    handleOnChangeAnswer={handleOnChangeAnswer}
                  />
                </Box>
              ))}
            </ResponsiveReactGridLayout>
          </div>
        </Box>
      </Stack>
    </div>
  );
};
