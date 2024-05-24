import { GetTemplatesParams, TemplateResponse } from '@/types';

import { TemplateItem } from '../TemplateItem';

export interface TemplateListProps {
  templateList: TemplateResponse[];
  params: GetTemplatesParams;
  setParams: React.Dispatch<React.SetStateAction<GetTemplatesParams>>;
}

export const TemplateList = (props: TemplateListProps) => {
  const { templateList, setParams, params } = props;
  return (
    <div className='mx-8 grid grid-cols-1  gap-4 md:grid-cols-3 lg:grid-cols-4'>
      {templateList.map((templateItem) => (
        <TemplateItem
          key={templateItem.id}
          {...templateItem}
          setParams={setParams}
          params={params}
        />
      ))}
    </div>
  );
};
