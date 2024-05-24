// eslint-disable-next-line simple-import-sort/imports
import { API_URL } from '@/constants';

import { rootApi } from './rootApi';
import {
  GetTemplatesDetailsResponse,
  GetTemplatesParams,
  GetTemplatesResponse,
} from '@/types/templates';
import { SuccessResponse } from '@/types';

const templateApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getTemplates: build.query<GetTemplatesResponse, GetTemplatesParams>({
      query: (getTemplatesParams: GetTemplatesParams) => ({
        url: API_URL.TEMPLATES,
        method: 'GET',
        params: getTemplatesParams,
      }),
      transformResponse: (response: SuccessResponse<GetTemplatesResponse>) =>
        response.data,
      providesTags: ['Templates'],
    }),
    getTemplateQueryDetails: build.query<
      GetTemplatesDetailsResponse,
      { templateId: number }
    >({
      query: ({ templateId }: { templateId: number }) => ({
        url: `/${API_URL.TEMPLATES}/${templateId}`,
        method: 'GET',
      }),
      transformResponse: (
        response: SuccessResponse<GetTemplatesDetailsResponse>,
      ) => response.data,
      providesTags: (result, error, { templateId }) => [
        { type: 'Templates', id: templateId },
      ],
    }),
    getTemplateDetails: build.mutation<
      GetTemplatesDetailsResponse,
      { templateId: number }
    >({
      query: ({ templateId }: { templateId: number }) => ({
        url: `/${API_URL.TEMPLATES}/${templateId}`,
        method: 'GET',
      }),
      transformResponse: (
        response: SuccessResponse<GetTemplatesDetailsResponse>,
      ) => response.data,
    }),
  }),
});

export const {
  useGetTemplatesQuery,
  useGetTemplateDetailsMutation,
  useGetTemplateQueryDetailsQuery,
} = templateApi;
