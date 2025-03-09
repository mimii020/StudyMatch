import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateHelpRequest, HelpRequest } from './interface';



export const helpRequestApi = createApi({
  reducerPath: 'helpRequestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/help-requests`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    }
  }),
  tagTypes: ['HelpRequest'],
  endpoints: (builder) => ({
    sendHelpRequest: builder.mutation<HelpRequest, CreateHelpRequest>({
      query: (createHelpRequest) => ({
        url: "/",
        method: "POST",
        body: createHelpRequest
      }),
      invalidatesTags:  (result) => result ? [{ type: 'HelpRequest', id: result.helpRequestId }] : [],
    }),
  }),
});

export const {
  useSendHelpRequestMutation
} = helpRequestApi;