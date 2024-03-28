import { useEffect } from 'react';
import { Box, Image, Stack } from '@mantine/core';

import { useElementLayouts } from '@/contexts';
import { FactoryElement } from '@/molecules/FactoryElement';
import { ElementItem, FormResponse } from '@/types';

import { ResponsiveReactGridLayout } from '../ResponsiveGridLayout';

interface FormRenderComponentProps {
  form?: FormResponse;
}

export const FormRenderComponent = ({ form }: FormRenderComponentProps) => {
  const { elements, setElements, edittingItem, setEdittingItem } =
    useElementLayouts();

  const handleFields = (fields: ElementItem['fields']) => {
    setEdittingItem({ ...edittingItem, fields: fields } as ElementItem);
  };

  const updateItem = (item: ElementItem) => {
    setElements(
      elements.map((element) => {
        if (element.id !== edittingItem!.id) return element;
        return item;
      }),
    );
  };

  const handleOnChangeAnswer =
    (fieldId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedEdittingField = edittingItem!.fields.map((field) => {
        if (field.id !== fieldId) return field;
        return {
          id: field.id,
          name: field.name,
          text: event.currentTarget.value,
        };
      });
      handleFields(updatedEdittingField);
      updateItem({
        ...edittingItem,
        fields: updatedEdittingField,
      } as ElementItem);
    };

  useEffect(() => {
    if (form) {
      const elementsForm = form.elements as ElementItem[];
      setElements(
        elementsForm.map((element) => {
          const updatedFields = element.fields.map((field) => {
            if (!field.text) {
              return { ...field, text: '' };
            }
            return field;
          });
          return { ...element, fields: updatedFields };
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  return (
    <div className='flex w-full flex-col items-center'>
      {form?.logoUrl && (
        <Image
          src={form.logoUrl}
          className='mb-8 h-[140px] w-[360px] object-cover'
        />
      )}
      <Stack className='w-[45%] justify-between gap-7'>
        <div className='w-full rounded-md border border-solid border-slate-200 bg-white p-7 shadow-lg'>
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
                onClick={() => setEdittingItem(element)}
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
      </Stack>
    </div>
  );
};
