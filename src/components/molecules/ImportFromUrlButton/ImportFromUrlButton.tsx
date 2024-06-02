import { useTranslation } from 'react-i18next';
import { IoCloseCircle } from 'react-icons/io5';
import { ActionIcon, Popover, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Field, Formik } from 'formik';

import { useBuildFormContext } from '@/contexts';
import { useImportGoogleFormMutation } from '@/redux/api/formApi';
import { ElementItem } from '@/types';
import { validateUrl } from '@/utils';
import { createElement } from '@/utils/elements';

import { QuestionFooter } from '../QuestionFooter';
import { TextInput } from '../TextInput';

export interface ImportFromUrlButtonProps {
  elements: ElementItem[];
  setElements: (value: ElementItem[]) => void;
}

export const ImportFromUrlButton = (props: ImportFromUrlButtonProps) => {
  const { elements, setElements } = props;
  const [opened, { close, toggle }] = useDisclosure(false);
  const { setForm, form } = useBuildFormContext();
  const [importGoogleForm] = useImportGoogleFormMutation();
  const { t } = useTranslation();

  return (
    <Popover position='right' shadow='md' opened={opened}>
      <Popover.Target>
        <UnstyledButton onClick={toggle}>
          {t('importFromGoogle')}
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown>
        <div className='mb-5 flex items-center justify-between'>
          <Text>{t('importUrl')}</Text>
          <ActionIcon onClick={close}>
            <IoCloseCircle />
          </ActionIcon>
        </div>
        <Formik
          initialValues={{ formUrl: '' }}
          onSubmit={(values) => {
            importGoogleForm({ formUrl: values.formUrl }).then(
              (formResponse) => {
                if ('data' in formResponse) {
                  setForm({ ...form, title: formResponse.data.data.title });
                  setElements([
                    ...elements,
                    ...formResponse.data.data.elements.map(
                      (elementResponse) =>
                        createElement(
                          elementResponse.type,
                          elementResponse.config,
                        ) as unknown as ElementItem,
                    ),
                  ]);
                  close();
                }
              },
            );
          }}
        >
          {({ handleSubmit }) => (
            <form
              className='mt-5 min-w-[550px]'
              onSubmit={(e) => {
                e.stopPropagation();
                handleSubmit(e);
              }}
            >
              <Field
                readOnly={false}
                name='formUrl'
                validate={validateUrl}
                placeholder='Import url...'
                component={TextInput}
              />
              <div className='mt-5'>
                <QuestionFooter
                  actionName='Confirm'
                  tips={
                    <div className='border border-mainPrimaryColorFilled bg-lightMainPrimaryColorFilled p-3 text-mainPrimaryColorFilled'>
                      <Text>Form must be in mode share with other</Text>
                    </div>
                  }
                />
              </div>
            </form>
          )}
        </Formik>
      </Popover.Dropdown>
    </Popover>
  );
};
