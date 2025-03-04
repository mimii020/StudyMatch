import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Skill } from './interface';

//load skills based on their subject
//this is different from the student's skils


export const skillApi = createApi({
  reducerPath: 'skillApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    prepareHeaders: (headers) => {
      if (typeof window !== 'undefined') { 
        const token = localStorage.getItem('accessToken');
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      }
      return headers;
    }
  }),
  tagTypes: ['Skill'],
  endpoints: (builder) => ({
    getSkillById: builder.query<Skill, {subjectId: number, skillId: number}>({
      query: ({subjectId, skillId}) => `/subjects/${subjectId}/skills/${skillId}`,
      providesTags: (result) => result ? [{ type: 'Skill', id: result.id }] : [],
    }),
    getSkillsBySubjectId: builder.query<Skill[], number>({
      query: (subjectId) => `/subjects/${subjectId}/skills`,
      providesTags: (result) => result ? [
        ...result.map(({ id }) => ({ type: 'Skill' as const, id })),
          { type: 'Skill', id: 'LIST' },
      ]
    : [{ type: 'Skill', id: 'LIST' }],
    }),
    searchSkills: builder.query<Skill[], {subjectId: number, query: string}>({
      query: ({subjectId, query}) => ({
        url: `/subjects/${subjectId}/skills/search`,
        params: {
          searchQuery: query 
        }
      }),
      providesTags: (result) => result ? [
        ...result.map(({ id }) => ({ type: 'Skill' as const, id })),
          { type: 'Skill', id: 'LIST' },
      ]
    : [{ type: 'Skill', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetSkillsBySubjectIdQuery,
  useSearchSkillsQuery
} = skillApi;