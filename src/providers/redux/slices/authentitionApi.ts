import { API_URL } from '@/constants/api.constants';

import { emptySplitApi } from './emptySplitApi';

const authenticationApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.query({
      query: () => ({
        url: API_URL.URL_LOGIN,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginUserQuery } = authenticationApi;
