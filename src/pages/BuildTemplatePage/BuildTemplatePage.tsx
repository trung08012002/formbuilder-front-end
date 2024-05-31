import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Stack } from '@mantine/core';

import { useBuildFormContext } from '@/contexts';
import { BuildTemplateSection } from '@/organisms/BuildTemplateSection';
import { SettingSection } from '@/organisms/SettingsSection';
import { BuildFormHeader } from '@/templates/Header';
import { TopBarTemplate } from '@/templates/TopBarTemplate';
import { cn } from '@/utils';

export interface TemplateExtraInfo {
  disabledForm: boolean;
  description: string;
  categoryId: number;
}

export const BuildTemplatePage = () => {
  const { previewMode } = useBuildFormContext();
  const [templateExtraInfo, setTemplateExtraInfo] = useState<TemplateExtraInfo>(
    {
      disabledForm: false,
      description: '',
      categoryId: 6,
    },
  );
  return (
    <Box
      className={cn(
        'h-screen justify-between transition-all duration-[350ms] ease-linear',
        {
          '-translate-y-[70px]': previewMode,
        },
      )}
    >
      <BuildFormHeader />
      <Stack className='justify-start gap-0'>
        <Box className='sticky right-0 top-0 z-[100]'>
          <TopBarTemplate
            listComponent={[
              <BuildTemplateSection templateExtraInfo={templateExtraInfo} />,
              <SettingSection
                templateExtraInfo={templateExtraInfo}
                setTemplateExtraInfo={setTemplateExtraInfo}
              />,
            ]}
          />
        </Box>
        <Outlet />
      </Stack>
    </Box>
  );
};
