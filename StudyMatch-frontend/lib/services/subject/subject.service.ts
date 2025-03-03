import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const subjectApi = createApi({
  reducerPath: 'subjectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    }
  }),
  tagTypes: ['Subject'],
  endpoints: (builder) => ({
    getSubjectById: builder.query<Subject, number>({
      query: (subjectId) => `/subjects/${subjectId}`,
      providesTags: (result) => result ? [{ type: 'Subject', id: result.id }] : [],
    }),
    getSubjects: builder.query<Subject[], void>({
      query: () => `/subjects`,
      providesTags: (result) => result ? [
          ...result.map(({ id }) => ({ type: 'Subject' as const, id })),
          { type: 'Subject', id: 'LIST' },
      ]
    : [{ type: 'Subject', id: 'LIST' }],
    }),


    
  }),
});

export const {
  useGetSubjectsQuery,
  useGetSubjectByIdQuery,
} = subjectApi;