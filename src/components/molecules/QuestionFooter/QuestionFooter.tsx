import { useState } from 'react';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import { Button, List, Text, UnstyledButton } from '@mantine/core';

interface QuestionFooterProps {
  actionName?: string;
  tips?: React.ReactNode;
}

export const QuestionFooter = (props: QuestionFooterProps) => {
  const {
    actionName = 'Add Question',
    tips = (
      <div className='border border-mainPrimaryColorFilled bg-lightMainPrimaryColorFilled p-3 text-mainPrimaryColorFilled'>
        <Text>Let the AI know:</Text>
        <List>
          <List.Item>
            What information you'd like to collect (e.g. email, name,
            description)
          </List.Item>
          <List.Item>
            Should the user select from options to answer the question?
          </List.Item>
          <List.Item>
            What tone would you like the question in (e.g. formal, informal)?
          </List.Item>
        </List>
      </div>
    ),
  } = props;
  const [isShowsTips, setIsShowTips] = useState(false);
  const handleShowTips = () => {
    setIsShowTips(!isShowsTips);
  };

  return (
    <div>
      <div className='flex justify-between'>
        <UnstyledButton onClick={handleShowTips}>
          <Text className='text-mainPrimaryColorFilled underline'>
            {isShowsTips ? 'Hide tips' : 'Tips'}
          </Text>
        </UnstyledButton>
        <Button leftSection={<FaWandMagicSparkles />} type='submit'>
          {actionName}
        </Button>
      </div>
      {isShowsTips && (
        <div className='mt-2 rounded border border-solid border-mainPrimaryColorFilled '>
          {tips}
        </div>
      )}
    </div>
  );
};
