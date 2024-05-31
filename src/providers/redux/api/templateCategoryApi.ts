import { API_URL } from '@/constants';
import { SuccessResponse } from '@/types';
import { TemplateCategoryInfo } from '@/types/templateCategory';

import { rootApi } from './rootApi';

const templateCategoryApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getTemplateCategory: build.query<TemplateCategoryInfo[], void>({
      query: () => ({
        url: API_URL.TEMPLATES_CATEGORY,
        method: 'GET',
      }),
      transformResponse: (response: SuccessResponse<TemplateCategoryInfo[]>) =>
        response.data,
      providesTags: ['TemplateCategories'],
    }),
  }),
});

export const { useGetTemplateCategoryQuery } = templateCategoryApi;
