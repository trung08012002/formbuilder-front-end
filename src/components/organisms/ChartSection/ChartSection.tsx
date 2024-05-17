import { useState } from 'react';
import { Box } from '@mantine/core';

import { ChartCustomType } from '@/types';

import { BuildChartLeftBar } from '../BuildChartLeftBar';
import { ResponsiveGridLayoutChart } from '../ResponseGridLayoutChart';

const STRETCH_BUILD_CHART_LEFT_BAR = 3;

const STRETCH_CHART_CONTAINER = 9;

export const ChartSection = () => {
  const [currentChartType, setCurrentChartType] = useState<ChartCustomType>();
  return (
    <Box className='relative flex h-full min-h-screen w-full bg-malachite-50'>
      <Box flex={STRETCH_BUILD_CHART_LEFT_BAR}>
        <Box className='flex h-full flex-col justify-between border-l-[0.5px] border-r-[0.5px] border-gray-300 bg-gray-50 lg:min-w-[270px] lg:max-w-[300px]'>
          <BuildChartLeftBar setCurrentElementType={setCurrentChartType} />
        </Box>
      </Box>
      <Box flex={STRETCH_CHART_CONTAINER} className='mx-20'>
        <ResponsiveGridLayoutChart
          currentElementType={currentChartType!}
          isDisabled={false}
        />
      </Box>
    </Box>
  );
};
