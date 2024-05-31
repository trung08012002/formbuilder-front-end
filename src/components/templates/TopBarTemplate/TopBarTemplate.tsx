import { ReactNode, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Tabs as MantineTabs } from '@mantine/core';
import _isEqual from 'lodash.isequal';

import { ToggleButton } from '@/atoms/Button/ToggleButton';
import { useBuildFormContext } from '@/contexts';
import { useGetFormDetailsQuery } from '@/redux/api/formApi';

const tabList = [
  { title: 'Build', value: '/' },
  { title: 'Settings', value: 'settings' },
];

export interface TopBarTemplateProps {
  listComponent: ReactNode[];
}

export const TopBarTemplate = (props: TopBarTemplateProps) => {
  const { isEditForm, form, previewMode, setPreviewMode } =
    useBuildFormContext();
  const { listComponent } = props;

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const { id: templateId } = useParams();

  const { data: formData } = useGetFormDetailsQuery(
    { id: templateId || '' },
    { skip: !templateId },
  );

  const haveUnsavedChanges = useMemo(
    () => !isEditForm || !_isEqual(formData, form),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isEditForm, form],
  );

  const handleClickPreviewButton = () => {
    if (!previewMode && haveUnsavedChanges) {
      return;
    }
    setPreviewMode((prevState) => !prevState);
    previewMode
      ? navigate(pathname.replace('/preview', ''))
      : navigate(pathname.concat('/preview'));
  };

  return (
    <>
      {previewMode ? (
        <Box className='relative flex h-[50px] items-center justify-start gap-0 bg-gradient-to-r from-malachite-400 to-malachite-600 pl-10'>
          <ToggleButton
            label='Preview form'
            className='absolute right-10 top-[50%] -translate-y-1/2 text-sm text-white'
            isEnable={previewMode}
            handleToggleButton={handleClickPreviewButton}
          />
        </Box>
      ) : (
        <MantineTabs
          color='#8ad56c'
          variant='pills'
          classNames={{ tabLabel: 'uppercase' }}
          className='relative'
          defaultValue='/'
        >
          <MantineTabs.List className='h-[50px] justify-center gap-0 bg-gradient-to-r from-malachite-400 to-malachite-600'>
            {tabList.map((tab, index) => (
              <MantineTabs.Tab
                key={index}
                value={tab.value}
                className='h-full min-w-40 rounded-[0] px-8 text-lg text-white duration-150 hover:bg-activeTabBackground'
              >
                {tab.title}
              </MantineTabs.Tab>
            ))}
          </MantineTabs.List>
          {listComponent.map((tabPanel, index) => (
            <MantineTabs.Panel value={tabList[index].value}>
              {tabPanel}
            </MantineTabs.Panel>
          ))}
        </MantineTabs>
      )}
    </>
  );
};
