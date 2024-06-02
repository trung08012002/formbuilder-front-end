import { IoTrash } from 'react-icons/io5';
import { Text } from '@mantine/core';
import FileSaver from 'file-saver';
import { t } from 'i18next';

import { Button } from '@/atoms/Button';
import { ResponseRow } from '@/molecules/ResponsesTable';
import {
  useDeleteMultipleResponsesMutation,
  useDeleteOneResponseMutation,
  useExportResponsesMutation,
} from '@/redux/api/responseApi';

interface TopBarSubmission {
  formId: number;
  selectedResponseIds: number[];
  setSelectedRecords: React.Dispatch<React.SetStateAction<ResponseRow[]>>;
  showingResponseRows: ResponseRow[];
}

export const TopBarSubmission = (props: TopBarSubmission) => {
  const {
    selectedResponseIds,
    setSelectedRecords,
    showingResponseRows,
    formId,
  } = props;
  const handleSelectAllOrDeselectClick = () => {
    if (showingResponseRows.length > selectedResponseIds.length) {
      setSelectedRecords(showingResponseRows);
      return;
    }
    setSelectedRecords([]);
  };

  const [deleteOneResponse, { isLoading: isLoadingDeleteOneResponse }] =
    useDeleteOneResponseMutation();
  const [exportResponsesMutation, { isLoading: isExportResponseLoading }] =
    useExportResponsesMutation();
  const [
    deleteMultipleResponses,
    { isLoading: isLoadingDeleteMultipleResponse },
  ] = useDeleteMultipleResponsesMutation();

  const handleDeleteOneOrMultiple = () => {
    if (selectedResponseIds.length == 1) {
      deleteOneResponse({ formId, responseId: selectedResponseIds[0] }).then(
        () => setSelectedRecords([]),
      );
      return;
    }
    deleteMultipleResponses({ formId, responsesIds: selectedResponseIds }).then(
      () => setSelectedRecords([]),
    );
  };

  if (selectedResponseIds.length === 0)
    return (
      <div className='flex h-[74px] w-full items-center justify-end'>
        <Button
          loading={isExportResponseLoading}
          className='mr-3 h-[36px]'
          size='md'
          onClick={() =>
            exportResponsesMutation(formId).then((response) => {
              if ('data' in response) {
                const data = new Blob([response.data], {
                  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
                });
                return FileSaver.saveAs(data, `${Date.now().toString()}.xlsx`);
              }
            })
          }
          title={t('export')}
        />
      </div>
    );

  return (
    <div className='flex w-full items-center justify-between p-4'>
      <div className='flex items-center justify-between gap-3'>
        <Text className='text-[15px] text-gray-600'>
          {`${t('selected')} ${selectedResponseIds.length} ${selectedResponseIds.length === 1 ? t('record') : t('records')}`}
        </Text>
        <Button
          className='h-[36px]'
          size='md'
          onClick={handleSelectAllOrDeselectClick}
          title={
            showingResponseRows.length > selectedResponseIds.length
              ? t('select')
              : t('unSelectAll')
          }
        />
      </div>
      <Button
        loading={isLoadingDeleteOneResponse || isLoadingDeleteMultipleResponse}
        className='h-[36px]'
        loaderProps={{ type: 'dots', color: 'red' }}
        size='md'
        variant='outline'
        color='error'
        onClick={handleDeleteOneOrMultiple}
        leftSection={<IoTrash size={18} />}
        title={t('delete')}
      />
    </div>
  );
};
