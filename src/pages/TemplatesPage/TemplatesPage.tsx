import { useState } from 'react';
import { LoadingOverlay } from '@mantine/core';

import { LeftIconTemplate } from '@/molecules/LeftIconTemplate';
import { NoSearchResultFound } from '@/molecules/NoSearchResultFound';
import { RightIconTemplate } from '@/molecules/RIghtIconTemplate';
import { SearchBar } from '@/molecules/SearchBar';
import { TemplateList } from '@/molecules/TemplateList';
import { useGetTemplatesQuery } from '@/redux/api/templateApi';
import { GetTemplatesParams } from '@/types';

export const TemplatesPage = () => {
  const [params, setParams] = useState<GetTemplatesParams>({});
  const { data, isFetching } = useGetTemplatesQuery(params);

  if (params.search !== undefined && (!data || data.templates.length == 0))
    return <NoSearchResultFound search={params.search} />;

  return (
    <div>
      <div className='relative mx-auto mb-16 mt-14 flex max-w-full items-center text-center lg:max-w-md'>
        <RightIconTemplate />
        <SearchBar setParams={setParams} />
        <LeftIconTemplate />
      </div>
      <TemplateList
        setParams={setParams}
        params={params}
        templateList={data?.templates || []}
      />
      <LoadingOverlay visible={isFetching} />
    </div>
  );
};
