import { useMemo, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import { IoCloseOutline } from 'react-icons/io5';
import {
  ActionIcon,
  Box,
  Group,
  Popover,
  Stack,
  Tabs,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Field, Formik } from 'formik';

import { ElementGroupType, ElementList } from '@/configs';
import { useElementLayouts } from '@/contexts';
import { ImportFromUrlButton } from '@/molecules/ImportFromUrlButton';
import { QuestionFooter } from '@/molecules/QuestionFooter';
import { Textarea } from '@/molecules/Textarea';
import { useGetElementsFromQuestionMutation } from '@/redux/api/openAiApi';
import { ElementItem, ElementType } from '@/types';
import { cn, validateQuestion } from '@/utils';
import { createElement } from '@/utils/elements';

import { ItemElement } from '../ItemElement';

const elementList = ElementList as ElementGroupType[];
interface BuildFormLeftbarProps {
  setCurrentElementType: (element: ElementType) => void;
}

const ELEMENT_ICON_SIZE = 25;

export const BuildFormLeftbar = ({
  setCurrentElementType,
}: BuildFormLeftbarProps) => {
  const { elements, setElements } = useElementLayouts();
  const [getElementsFromQuestion] = useGetElementsFromQuestionMutation();
  const [searchValue, setSearchValue] = useState('');
  const hasSubmitButton = elements.some(
    (element) => element.type === ElementType.SUBMIT,
  );
  const [opened, { close, toggle }] = useDisclosure(false);
  const handleDrop = (elementType: ElementType) => {
    setCurrentElementType(elementType);
  };
  const handleOnChangeSearchValue = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchValue(e.target.value);
  };

  const filteredElements = useMemo(
    () =>
      elementList
        .filter(
          (elements) =>
            elements.elements.findIndex((element) =>
              element.element.type
                .toLowerCase()
                .includes(searchValue.toLowerCase()),
            ) !== -1,
        )
        .map((elements: ElementGroupType) => ({
          title: elements.title,
          elements: elements.elements.filter((element) =>
            element.element.type
              .toLowerCase()
              .includes(searchValue.toLowerCase()),
          ),
        })),
    [searchValue],
  );

  return (
    <div className='flex h-full flex-col justify-start overflow-auto pt-4'>
      <div className='z-10 -mb-[10px] flex items-center gap-2 border-b border-transparent bg-gray-50 px-3 pb-[10px] transition duration-200'>
        <div className='flex flex-col gap-5'>
          <div className='flex w-full items-center gap-2'>
            <TextInput
              value={searchValue}
              onChange={handleOnChangeSearchValue}
              placeholder='Search fields'
              size='md'
              leftSection={<CiSearch size={16} />}
              rightSection={
                <ActionIcon
                  variant='transparent'
                  size='lg'
                  className={cn('invisible text-gray-400 hover:text-gray-500', {
                    visible: searchValue,
                  })}
                >
                  <IoCloseOutline size={18} />
                </ActionIcon>
              }
            />
            <div>
              <Popover position='right' shadow='md' opened={opened}>
                <Popover.Target>
                  <ActionIcon
                    onClick={toggle}
                    className='bg-[#F3E8FF]'
                    styles={{
                      root: {
                        '--ai-hover': '#c2a1ef',
                        '--ai-color': '#c2a1ef',
                        '--ai-hover-color': '#f2e8ff',
                      },
                    }}
                  >
                    <FaWandMagicSparkles style={{ color: '#A855F7' }} />
                  </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown>
                  <Tabs defaultValue='One question'>
                    <Tabs.List>
                      <Tabs.Tab value='One question'>One question</Tabs.Tab>
                      <Tabs.Tab value='Multiple questions'>
                        Multiple questions
                      </Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value='One question'>
                      <Formik
                        initialValues={{ oneQuestion: '' }}
                        onSubmit={(values) => {
                          getElementsFromQuestion({
                            questions: values.oneQuestion,
                          }).then((elementsResponse) => {
                            if ('data' in elementsResponse) {
                              setElements([
                                ...elements,
                                ...elementsResponse.data.data.elements.map(
                                  (elementResponse) =>
                                    createElement(
                                      elementResponse.elementType,
                                      elementResponse.config,
                                    ) as unknown as ElementItem,
                                ),
                              ]);
                              close();
                            }
                          });
                        }}
                      >
                        {({ handleSubmit }) => (
                          <form
                            className='mt-5'
                            onSubmit={(e) => {
                              e.stopPropagation();
                              handleSubmit(e);
                            }}
                          >
                            <Field
                              readOnly={false}
                              name='oneQuestion'
                              classNameWrapper='w-full min-h-[124px]'
                              validate={validateQuestion}
                              placeholder='Describe the question you want to add with AI...'
                              size='sm'
                              component={Textarea}
                              resize={'none'}
                              classNames={{
                                input:
                                  'max-h-[180px] min-h-[100px] overflow-y-auto',
                              }}
                            />
                            <QuestionFooter />
                          </form>
                        )}
                      </Formik>
                    </Tabs.Panel>
                    <Tabs.Panel value='Multiple questions'>
                      <Formik
                        initialValues={{ multipleQuestions: '' }}
                        onSubmit={(values) => {
                          getElementsFromQuestion({
                            questions: values.multipleQuestions,
                          }).then((elementsResponse) => {
                            if ('data' in elementsResponse) {
                              setElements([
                                ...elements,
                                ...elementsResponse.data.data.elements.map(
                                  (elementResponse) =>
                                    createElement(
                                      elementResponse.elementType,
                                      elementResponse.config,
                                    ) as unknown as ElementItem,
                                ),
                              ]);
                            }
                            close();
                          });
                        }}
                      >
                        {({ handleSubmit }) => (
                          <form
                            className='mt-5'
                            onSubmit={(e) => {
                              e.stopPropagation();
                              handleSubmit(e);
                            }}
                          >
                            <Field
                              readOnly={false}
                              name='multipleQuestions'
                              classNameWrapper='w-full min-h-[124px]'
                              placeholder='Describe the question you want to add with AI...'
                              validate={validateQuestion}
                              size='sm'
                              component={Textarea}
                              resize={'none'}
                              classNames={{
                                input:
                                  'max-h-[180px] min-h-[100px] overflow-y-auto',
                              }}
                            />
                            <QuestionFooter />
                          </form>
                        )}
                      </Formik>
                    </Tabs.Panel>
                  </Tabs>
                </Popover.Dropdown>
              </Popover>
            </div>
          </div>
          <ImportFromUrlButton setElements={setElements} elements={elements} />
        </div>
      </div>
      <div className='flex h-full flex-col overflow-hidden overflow-y-scroll px-3 pb-6'>
        {filteredElements.map((elementType, index) => (
          <Stack key={`category-${index}`} className='gap-0'>
            <Box className='flex p-2 '>
              <Text className='mt-6 text-sm font-medium text-gray-400'>
                {elementType.title}
              </Text>
            </Box>
            <Box className='mt-3 grid grid-cols-2 gap-2 gap-y-4 lg:grid-cols-2'>
              {elementType.elements.map(({ element }, index) => {
                const isSubmitElement = element.type === ElementType.SUBMIT;
                return (
                  <Box key={`element-${index}`}>
                    {!isSubmitElement ? (
                      <Group
                        className='group cursor-move '
                        draggable={true}
                        unselectable='on'
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', '');
                          handleDrop(element.type);
                        }}
                      >
                        <ItemElement
                          icon={<element.icon size={ELEMENT_ICON_SIZE} />}
                          text={element.type}
                        />
                      </Group>
                    ) : (
                      <Tooltip
                        label='Your form already has one submit button'
                        position='right'
                        arrowSize={6}
                        withArrow
                        offset={15}
                        disabled={!hasSubmitButton}
                      >
                        <Group
                          className={cn('group', {
                            'cursor-not-allowed': hasSubmitButton,
                            'cursor-move ': !hasSubmitButton,
                          })}
                          draggable={!hasSubmitButton}
                          unselectable={'on'}
                          onDragStart={(e) => {
                            if (hasSubmitButton) {
                              e.preventDefault();
                              return;
                            }
                            e.dataTransfer.setData('text/plain', '');
                            handleDrop(element.type);
                          }}
                        >
                          <ItemElement
                            icon={<element.icon size={ELEMENT_ICON_SIZE} />}
                            text={element.type}
                          />
                        </Group>
                      </Tooltip>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Stack>
        ))}
      </div>
    </div>
  );
};
