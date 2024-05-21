import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import { Button, List, Text, UnstyledButton } from '@mantine/core';

interface QuestionFooterProps {
  actionName?: string;
  tips?: React.ReactNode;
}

export const QuestionFooter = (props: QuestionFooterProps) => {
  const { actionName = 'addQuestion', tips } = props;
  const [isShowsTips, setIsShowTips] = useState(false);
  const { t } = useTranslation();
  const handleShowTips = () => {
    setIsShowTips(!isShowsTips);
  };

  return (
    <div>
      <div className='flex justify-between gap-5'>
        <UnstyledButton onClick={handleShowTips}>
          <Text className='text-mainPrimaryColorFilled underline'>
            {isShowsTips ? t('hideTips') : t('tips')}
          </Text>
        </UnstyledButton>
        <Button leftSection={<FaWandMagicSparkles />} type='submit'>
          {t(actionName)}
        </Button>
      </div>
      {isShowsTips && (
        <div className='mt-2 rounded border border-solid border-mainPrimaryColorFilled '>
          {tips || (
            <div className='border border-mainPrimaryColorFilled bg-lightMainPrimaryColorFilled p-3 text-mainPrimaryColorFilled'>
              <Text>{t('letAiKnow')}</Text>
              <List>
                <List.Item>{t('firstDescription')}</List.Item>
                <List.Item>{t('secondDescription')}</List.Item>
                <List.Item>{t('thirdDescription')}</List.Item>
              </List>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
