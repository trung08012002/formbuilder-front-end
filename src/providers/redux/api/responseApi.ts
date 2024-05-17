import { API_URL } from '@/constants';
import { SuccessResponse } from '@/types';
import { DataDateInColumn, DataInColumn } from '@/types/charts';
import {
  FormAnswerRequest,
  FormAnswerResponse,
  GetResponsesParams,
  ReturnGetResponses,
} from '@/types/responses';

import { rootApi } from './rootApi';

interface GetResponsesType extends GetResponsesParams {
  formId: number;
}

export const responseApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getResponsesByFormId: build.query({
      query: ({ formId, ...params }: GetResponsesType) => ({
        url: `${API_URL.RESPONSES}/${formId}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: SuccessResponse<ReturnGetResponses>) =>
        response.data,
      providesTags: ['Responses'],
    }),
    exportResponses: build.mutation({
      query: (formId: number) => ({
        url: `${API_URL.RESPONSES}/export/${formId}`,
        method: 'GET',
        responseType: 'arraybuffer',
      }),
    }),
    getStatistic: build.query({
      query: (formId: number) => ({
        url: `${API_URL.RESPONSES}/${API_URL.STATISTICS}/${formId}`,
        method: 'GET',
      }),
      transformResponse: (response: SuccessResponse<DataInColumn[]>) =>
        response.data,
    }),
    getDateDataStatistic: build.query({
      query: (formId: number) => ({
        url: `${API_URL.RESPONSES}/${API_URL.STATISTICS}/${API_URL.GET_DATE_DATE_STATISTIC}/${formId}`,
        method: 'GET',
      }),
      transformResponse: (response: SuccessResponse<DataDateInColumn[]>) =>
        response.data,
    }),
    createResponse: build.mutation<
      SuccessResponse<FormAnswerResponse>,
      {
        formId?: number;
        payload: FormAnswerRequest;
      }
    >({
      query: ({ formId = undefined, payload }) => ({
        url: `${API_URL.RESPONSES}/${formId}`,
        method: 'POST',
        data: payload,
      }),
      invalidatesTags: ['Responses'],
    }),
    deleteOneResponse: build.mutation({
      query: ({
        formId,
        responseId,
      }: {
        formId: number;
        responseId: number;
      }) => ({
        url: `${API_URL.RESPONSES}/${formId}/${responseId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Responses'],
    }),
    deleteMultipleResponses: build.mutation({
      query: ({
        formId,
        responsesIds,
      }: {
        formId: number;
        responsesIds: number[];
      }) => ({
        url: `${API_URL.RESPONSES}/${formId}`,
        method: 'DELETE',
        data: { responsesIds: responsesIds },
      }),
      invalidatesTags: ['Responses'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDateDataStatisticQuery,
  useGetStatisticQuery,
  useGetResponsesByFormIdQuery,
  useCreateResponseMutation,
  useDeleteMultipleResponsesMutation,
  useDeleteOneResponseMutation,
  useExportResponsesMutation,
} = responseApi;
