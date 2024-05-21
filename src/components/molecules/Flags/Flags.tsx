import { useTranslation } from 'react-i18next';
import { UnstyledButton } from '@mantine/core';
import { JP, US, VN } from 'country-flag-icons/react/3x2';

export const Flags = () => {
  const { i18n } = useTranslation();

  const languages = [
    {
      icon: <US height={30} width={30} />,
      lng: 'en',
    },
    {
      icon: <VN height={30} width={30} />,
      lng: 'vi',
    },
    {
      icon: <JP height={30} width={30} />,
      lng: 'jp',
    },
  ];

  return (
    <div className='flex items-center justify-center gap-6'>
      {languages.map((language) => (
        <UnstyledButton
          onClick={() => {
            i18n.changeLanguage(language.lng);
            localStorage.setItem('lng', language.lng);
          }}
        >
          {language.icon}
        </UnstyledButton>
      ))}
    </div>
  );
};
