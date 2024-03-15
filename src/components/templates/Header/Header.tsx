import { IoIosLogOut } from 'react-icons/io';
import { IoPersonOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Anchor, Group, Image, Menu } from '@mantine/core';

import WhiteLogo from '@/assets/images/whitelogo.png';
import { UserAvatar } from '@/atoms/UserAvatar';
import { PATH } from '@/constants/routes';
import { useGetMyProfileQuery } from '@/redux/api/userApi';
import { httpClient } from '@/utils';

const LOGO_HEIGHT = 45;

export const Header = () => {
  const { data: myProfile } = useGetMyProfileQuery();

  const navigate = useNavigate();

  const handleLogout = () => {
    httpClient.logout();
    navigate(PATH.ROOT_PAGE);
  };

  return (
    <header className='flex h-16 flex-row items-center justify-between bg-malachite-500 px-10'>
      <Anchor href='/'>
        <Image src={WhiteLogo} h={LOGO_HEIGHT} />
      </Anchor>
      <div>
        <Menu shadow='sm' offset={5} position='bottom-end' withArrow>
          <Menu.Target>
            <UserAvatar avatarUrl={myProfile?.avatarUrl ?? ''} />
          </Menu.Target>
          <Menu.Dropdown className='min-w-[230px]'>
            <Menu.Item className='p-3 font-medium text-gray-600 delay-100 ease-linear hover:bg-transparent'>
              <Group>
                <UserAvatar avatarUrl={myProfile?.avatarUrl ?? ''} />
                <div className='flex gap-1'>
                  <span className='text-[15px] font-normal'>Hello,</span>
                  <span className='text-[15px] font-medium'>
                    {myProfile?.username}
                  </span>
                </div>
              </Group>
            </Menu.Item>
            <Menu.Item
              leftSection={<IoPersonOutline size={16} />}
              className='gap-4 px-6 py-3 text-[15px] font-normal text-gray-600 delay-100 ease-linear hover:bg-malachite-50 hover:text-malachite-500'
              onClick={() => navigate(PATH.MY_ACCOUNT_PAGE)}
            >
              Account
            </Menu.Item>
            <Menu.Item
              leftSection={<IoIosLogOut size={16} />}
              className='gap-4 px-6 py-3 text-[15px] font-normal text-gray-600 delay-100 ease-linear hover:bg-malachite-50 hover:text-malachite-500'
              onClick={handleLogout}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </header>
  );
};
