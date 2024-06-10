// eslint-disable-next-line simple-import-sort/imports
import { API_URL } from '@/constants';

import { rootApi } from './rootApi';
import {
  CreateTemplateRequest,
  GetTemplatesDetailsResponse,
  GetTemplatesParams,
  GetTemplatesResponse,
  TemplateResponse,
  UpdateTemplateRequest,
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
      { templateId: number; filter?: boolean }
    >({
      query: ({
        templateId,
        filter = true,
      }: {
        templateId: number;
        filter?: boolean;
      }) => ({
        url: `/${API_URL.TEMPLATES}/${templateId}?filter=${filter}`,
        method: 'GET',
      }),
      transformResponse: (
        response: SuccessResponse<GetTemplatesDetailsResponse>,
      ) => response.data,
      providesTags: (_result, _error, { templateId }) => [
        { type: 'Templates', id: templateId },
      ],
    }),
    getTemplateDetails: build.mutation<
      GetTemplatesDetailsResponse,
      { templateId: number; filter?: boolean }
    >({
      query: ({
        templateId,
        filter,
      }: {
        templateId: number;
        filter?: boolean;
      }) => ({
        url: `/${API_URL.TEMPLATES}/${templateId}?filter=${filter}`,
        method: 'GET',
      }),
      transformResponse: (
        response: SuccessResponse<GetTemplatesDetailsResponse>,
      ) => response.data,
    }),
    createTemplate: build.mutation<
      SuccessResponse<TemplateResponse>,
      CreateTemplateRequest
    >({
      query: (data) => ({
        url: `/${API_URL.TEMPLATES}`,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Templates'],
    }),
    updateTemplate: build.mutation<
      SuccessResponse<TemplateResponse>,
      { templateId: number; data: UpdateTemplateRequest }
    >({
      query: ({ templateId, data }) => ({
        url: `/${API_URL.TEMPLATES}/${templateId}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['Templates'],
    }),
  }),
});

export const {
  useGetTemplatesQuery,
  useGetTemplateDetailsMutation,
  useGetTemplateQueryDetailsQuery,
  useCreateTemplateMutation,
  useUpdateTemplateMutation,
} = templateApi;
