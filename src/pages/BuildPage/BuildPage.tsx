import { Box, Group } from '@mantine/core';

export const BuildPage = () => (
  // TODO: need to update this page to add the sidebar and the form build container
  <Group className='gap-0'>
    <Box className='sidebar w-1/6'>Sidebar Content</Box>
    <Box className='main-content w-5/6'>Build Page</Box>
  </Group>
);
