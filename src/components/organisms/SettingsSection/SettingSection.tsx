import { Box, Divider, Group, Select, Stack, Textarea } from '@mantine/core';

import { ToggleButton } from '@/atoms/Button';
import { TemplateExtraInfo } from '@/pages/BuildTemplatePage';
import { useGetTemplateCategoryQuery } from '@/redux/api/templateCategoryApi';

export interface SettingSectionProps {
  templateExtraInfo: TemplateExtraInfo;
  setTemplateExtraInfo: React.Dispatch<React.SetStateAction<TemplateExtraInfo>>;
}

export const SettingSection = (props: SettingSectionProps) => {
  const { templateExtraInfo, setTemplateExtraInfo } = props;
  const { data: categories } = useGetTemplateCategoryQuery();

  return (
    <Box className='relative flex h-screen w-full items-center justify-center bg-malachite-50'>
      <Stack className='absolute top-[50%] w-[660px] -translate-y-[50%]'>
        <Group className=' items-center justify-between gap-2 rounded border border-solid border-blue-50 bg-white px-6 py-8'>
          <div className='flex w-full flex-col gap-5'>
            <Select
              label='Select category:'
              placeholder='Pick value'
              value={templateExtraInfo.categoryId.toString() || null}
              data={
                categories === undefined
                  ? []
                  : categories.map((category) => ({
                      value: category.id.toString(),
                      label: category.title,
                    }))
              }
              onChange={(_value, option) =>
                setTemplateExtraInfo({
                  ...templateExtraInfo,
                  categoryId: Number(option.value),
                })
              }
            />
            <Divider />
            <Textarea
              size='xl'
              label='Description:'
              placeholder='Input your description template'
              classNames={{ input: 'min-h-[130px]' }}
              defaultValue={templateExtraInfo.description}
              onChange={(event) =>
                setTemplateExtraInfo({
                  ...templateExtraInfo,
                  description: event.target.value,
                })
              }
            />
            <Divider />
            <div className='flex justify-between'>
              <Stack className='gap-[3px]'>
                <span className='text-base font-semibold uppercase text-blue-200'>
                  TEMPLATE STATUS
                </span>
                <span className='text-sm text-gray-500'>
                  {`Your form is currently ${templateExtraInfo.disabledForm ? 'unable' : 'able'} to receive submissions`}
                </span>
              </Stack>
              <ToggleButton
                label={templateExtraInfo.disabledForm ? 'DISABLED' : 'ENABLED'}
                labelClassName={
                  templateExtraInfo.disabledForm
                    ? 'text-gray-500 text-xs'
                    : 'text-malachite-500 text-xs'
                }
                className='text-sm text-gray-700'
                isEnable={!templateExtraInfo.disabledForm}
                handleToggleButton={() => {
                  setTemplateExtraInfo((extraInfo) => ({
                    ...extraInfo,
                    disabledForm: !extraInfo.disabledForm,
                  }));
                }}
              />
            </div>
          </div>
        </Group>
      </Stack>
    </Box>
  );
};
