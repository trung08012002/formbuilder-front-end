import { API_URL } from '@/constants/apiURL';
import { SuccessResponse, UploadImageResponse } from '@/types';

import { rootApi } from './rootApi';

const imageApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    uploadImage: build.mutation<SuccessResponse<UploadImageResponse>, File[]>({
      query: (files) => {
        const payload = new FormData();
        files.map((file) => payload.append('files', file));
        return {
          url: API_URL.UPLOAD_IMAGE,
          method: 'POST',
          data: payload,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useUploadImageMutation } = imageApi;
