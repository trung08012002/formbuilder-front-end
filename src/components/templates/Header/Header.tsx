import { useTranslation } from 'react-i18next';
import { IoIosLogOut } from 'react-icons/io';
import { IoPersonOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { Anchor, Group, Image, Menu } from '@mantine/core';

import WhiteLogo from '@/assets/images/whitelogo.png';
import { UserAvatar } from '@/atoms/UserAvatar';
import { PATH } from '@/constants/routes';
import { Flags } from '@/molecules/Flags';
import { Loader } from '@/molecules/Loader';
import { useGetMyProfileQuery } from '@/redux/api/userApi';
import { httpClient } from '@/utils';

const LOGO_HEIGHT = 45;

export const Header = () => {
  const { data: myProfile, isLoading } = useGetMyProfileQuery();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    httpClient.logout();
    navigate(PATH.ROOT_PAGE);
  };

  return (
    <header className='flex h-[70px] flex-row items-center justify-between bg-malachite-500 px-10 py-3'>
      <Anchor href={PATH.ROOT_PAGE}>
        <Image src={WhiteLogo} h={LOGO_HEIGHT} />
      </Anchor>
      {!myProfile || isLoading ? (
        <Loader color='white' />
      ) : (
        <div className='flex items-center gap-4'>
          <Link to={PATH.ROOT_PAGE} className='text-white no-underline'>
            {t('myForms')}
          </Link>
          <Link to={PATH.TEMPLATES_PAGE} className='text-white no-underline'>
            {t('templates')}
          </Link>
          <Link to={PATH.CREATE_TEMPLATE} className='text-white no-underline'>
            {t('createTemplate')}
          </Link>
          <Menu shadow='sm' offset={5} position='bottom-end' withArrow>
            <Menu.Target>
              <UserAvatar avatarUrl={myProfile.avatarUrl ?? ''} />
            </Menu.Target>
            <Menu.Dropdown className='min-w-[230px]'>
              <Flags />
              <Menu.Item className='p-3 font-medium text-gray-600 delay-100 ease-linear hover:bg-transparent'>
                <Group>
                  <UserAvatar avatarUrl={myProfile.avatarUrl ?? ''} />
                  <span className='text-[15px] font-medium'>
                    {t('hello', { name: myProfile.username })}
                  </span>
                </Group>
              </Menu.Item>
              <Menu.Item
                leftSection={<IoPersonOutline size={16} />}
                className='gap-4 px-6 py-3 text-[15px] font-normal text-gray-600 delay-100 ease-linear hover:bg-malachite-50 hover:text-malachite-500'
                onClick={() => navigate(PATH.MY_ACCOUNT_PAGE)}
              >
                {t('account')}
              </Menu.Item>
              <Menu.Item
                leftSection={<IoIosLogOut size={16} />}
                className='gap-4 px-6 py-3 text-[15px] font-normal text-gray-600 delay-100 ease-linear hover:bg-malachite-50 hover:text-malachite-500'
                onClick={handleLogout}
              >
                {t('logout')}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      )}
    </header>
  );
};
