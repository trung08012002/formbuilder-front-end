import { useMemo, useState } from 'react';
import { TbDatabaseOff } from 'react-icons/tb';
import { useParams } from 'react-router-dom';
import { Box } from '@mantine/core';
import dayjs from 'dayjs';

import { UnSignedHeader } from '@/atoms/UnsignedHeader';
import { ResponseRow, ResponsesTable } from '@/molecules/ResponsesTable';
import { TopBarSubmission } from '@/organisms/ActionToolbar';
import { useGetResponsesByFormIdQuery } from '@/redux/api/responseApi';
import { GetResponsesParams } from '@/types';

export const ResponsesPage = () => {
  const { formId } = useParams();
  const [selectedRecords, setSelectedRecords] = useState<ResponseRow[]>([]);
  const [params, setParams] = useState<GetResponsesParams>();
  const { data: response, isLoading } = useGetResponsesByFormIdQuery({
    formId: Number(formId),
    ...params,
  });

  const rawRecords = response?.responses;

  const responseRows: ResponseRow[] | undefined = useMemo(
    () =>
      rawRecords?.map((record) => {
        const answers = record.formAnswers.reduce(
          (elementAnswersList, elementAnswers, currentIndex) => {
            const elementAnswer = {
              [`NameElement${currentIndex}`]: elementAnswers.elementName,
              [`ValueElement${currentIndex}`]: elementAnswers.answers
                .map((fieldAnswer) => fieldAnswer.text)
                .join(' '),
            };

            const fieldsAnswers = elementAnswers.answers.reduce(
              (answers, currentFieldAnswer, currentIndex) => ({
                ...answers,
                [`NameField${currentIndex}`]: currentFieldAnswer.fieldName,
                [`ValueField${currentIndex}`]: currentFieldAnswer.text,
              }),
              { ...elementAnswer },
            );
            return { ...elementAnswersList, ...fieldsAnswers };
          },
          {
            id: record.id,
            createdAt: dayjs(record.createdAt).format('MMM DD, YYYY'),
          },
        );

        return {
          ...answers,
        };
      }),
    [rawRecords],
  );
  const selectedResponseIds = useMemo(
    () => selectedRecords.map((selectedRecord) => selectedRecord.id as number),
    [selectedRecords],
  );
  if (response === undefined) return <div></div>;
  if (responseRows?.length == 0) {
    return (
      <Box className='h-screen'>
        <Box className='h-headerHeight bg-malachite-500 px-4 pt-4'>
          <UnSignedHeader />
        </Box>
        <Box className='flex h-contentHeight w-full items-center justify-center bg-malachite-100 pt-10'>
          <div className='text-center'>
            <TbDatabaseOff size={80} />
            <p className='mb-8 text-lg text-gray-600'>
              Oops! No records found.
            </p>
          </div>
        </Box>
      </Box>
    );
  }
  return (
    <div>
      <div className='h-screen bg-gray-200'>
        <div className='h-headerHeight bg-malachite-500 px-4 pt-4'>
          <UnSignedHeader />
        </div>
        <TopBarSubmission
          formId={Number(formId)}
          selectedResponseIds={selectedResponseIds}
          setSelectedRecords={setSelectedRecords}
          showingResponseRows={responseRows || []}
        />
        <div>
          <ResponsesTable
            totalResponses={response.totalResponses}
            pageSize={response.pageSize}
            isLoading={isLoading}
            responseRows={responseRows || []}
            selectedRecords={selectedRecords}
            setSelectedRecords={setSelectedRecords}
            params={params}
            setParams={setParams}
          />
        </div>
      </div>
    </div>
  );
};
