import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { IoEye } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Modal, Text, Title, UnstyledButton } from '@mantine/core';
import { useDisclosure, useHover } from '@mantine/hooks';
import { motion } from 'framer-motion';

import { Button } from '@/atoms/Button';
import { PATH } from '@/constants';
import { useGetTemplateQueryDetailsQuery } from '@/redux/api/templateApi';
import { FormRequest } from '@/types';
import { CategoryDetails, GetTemplatesParams } from '@/types/templates';

import { PreviewTemplate } from '../PreviewTemplate';

export interface TemplateItemProps {
  title: string;
  imagePreviewUrl: string;
  description: string;
  id: number;
  category: CategoryDetails;
  setParams: React.Dispatch<React.SetStateAction<GetTemplatesParams>>;
  params: GetTemplatesParams;
}

export const TemplateItem = (props: TemplateItemProps) => {
  const {
    title,
    imagePreviewUrl,
    description,
    id,
    category,
    setParams,
    params,
  } = props;
  const navigate = useNavigate();
  const { hovered, ref } = useHover();
  const imageRef = useRef<HTMLImageElement>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const { data } = useGetTemplateQueryDetailsQuery({
    templateId: id,
    filter: false,
  });
  const { t } = useTranslation();
  const updatedData = useMemo(
    () =>
      ({
        title: data?.title,
        logoUrl: data?.logoUrl,
        settings: data?.settings,
        elements: data?.elements,
      }) as FormRequest,
    [data],
  );

  return (
    <div className='flex flex-col gap-2'>
      <Modal
        opened={opened}
        onClose={close}
        size='lg'
        title={<Title order={2}>{t('previewTemplate')}</Title>}
      >
        <PreviewTemplate form={updatedData} />
      </Modal>
      <div
        ref={ref}
        className='relative h-72 overflow-hidden rounded bg-slate-400 p-2'
      >
        <motion.button
          onClick={open}
          className='absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-slate-400 px-3 py-1'
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ type: 'tween', stiffness: 5 }}
        >
          <div className='flex items-center gap-2'>
            <IoEye className='text-white' />
            <Text className='text-white'>{t('preview')}</Text>
          </div>
        </motion.button>
        <motion.div
          className='flex items-center justify-center'
          initial={{ y: 0 }}
          animate={{
            y: hovered ? -((imageRef?.current?.clientHeight || 0) - 272) : 0,
          }}
          transition={{ type: 'tween', stiffness: 5 }}
        >
          <img
            ref={imageRef}
            src={imagePreviewUrl}
            style={{ maxWidth: '100%' }}
          />
        </motion.div>
      </div>
      <div className='min-h-4'>
        <Text size='lg' className='line-clamp-1 text-slate-900'>
          {title}
        </Text>
      </div>

      <p className='line-clamp-3 h-20 break-words text-slate-400'>
        {description}
      </p>

      <UnstyledButton
        onClick={() => setParams({ ...params, categoryId: category.id })}
      >
        <div
          style={{ backgroundColor: category.color }}
          className='w-fit max-w-full rounded px-2 py-1'
        >
          <Text size='lg' className='line-clamp-1'>
            {category.title}
          </Text>
        </div>
      </UnstyledButton>
      <Button
        title={t('useTemplate')}
        variant='outline'
        onClick={() =>
          navigate(PATH.BUILD_FORM_PAGE, { state: { templateId: id } })
        }
      />
    </div>
  );
};
