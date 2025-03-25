import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateHelpRequest, HelpRequest, UpdateHelpRequest } from './interface';



export const helpRequestApi = createApi({
  reducerPath: 'helpRequestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/help-requests`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      return headers;
    }
  }),
  tagTypes: ['HelpRequest'],
  endpoints: (builder) => ({
    sendHelpRequest: builder.mutation<HelpRequest, CreateHelpRequest>({
      query: (createHelpRequest) => ({
        url: "",
        method: "POST",
        body: createHelpRequest
      }),
      invalidatesTags:  (result) => result ? [{ type: 'HelpRequest', id: result.helpRequestId }] : [],
    }),

    getSentRequests: builder.query<HelpRequest[], void>({
      query: () => "/sent",
      providesTags: ["HelpRequest"],
    }),

    getReceivedRequests: builder.query<HelpRequest[], void>({
      query: () => "/received",
      providesTags: ["HelpRequest"],
    }),

    updateHelpRequest: builder.mutation<HelpRequest, 
        {requestId: number, updateRequest: UpdateHelpRequest}>({
      query: ({requestId, updateRequest}) => ({
        url: `/${requestId}`,
        method: "PATCH",
        body: updateRequest

      })
    })
  }),
});

export const {
  useSendHelpRequestMutation,
  useGetSentRequestsQuery,
  useGetReceivedRequestsQuery,
  useUpdateHelpRequestMutation,
} = helpRequestApi;