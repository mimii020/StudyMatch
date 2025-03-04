import { StudentProfile } from '@/lib/types/user.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddSkillRequest, StudentSearchRequest, StudentUpdateProfile } from './interface';

//get my profile info
//search students
//view another student's profile
//add skill (desired/offered)
//delete skill
//add bio


export const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    }
  }),
  tagTypes: ['Student'],
  endpoints: (builder) => ({
    searchStudents: builder.query<StudentProfile[], StudentSearchRequest>({
      query: (studentSearchRequest) => ({
        url: "/students/search",
        method: "POST",
        body: studentSearchRequest
      }),
      providesTags:  (result) =>
        result
          ? [
              { type: 'Student', id: 'LIST' },
              ...result.map((student: StudentProfile) => ({ type: 'Student' as const, id: student.id }))
            ]
          : [{ type: 'Student', id: 'LIST' }]
    }),
    getStudentById: builder.query<StudentProfile, number>({
      query: (studentId) => `/students/${studentId}`,
      providesTags: (result) => result ? [{ type: 'Student', id: result.id }] : [],
    }),
    getMyProfile: builder.query<StudentProfile, void>({
      query: () => `/students/me`,
      providesTags: (result) => result ? [{ type: 'Student', id: result.id }] : [],
    }),

    updateMyProfile: builder.mutation<StudentProfile, Partial<StudentUpdateProfile>>({
      query: (studentUpdateProfile) => ({
        url: '/students/me',
        method: 'PATCH',
        body: studentUpdateProfile,
      }),
      invalidatesTags: (result) => result ? [{ type: 'Student', id: result.id }] : [{ type: 'Student', id: 'ME' }],
    }),

    addSkill: builder.mutation<StudentProfile, AddSkillRequest>({
      query: (addSkillRequest) => ({
        url: '/students/me/skills',
        method: 'POST',
        params: { 
          skillId: addSkillRequest.skillId,
          skillType: addSkillRequest.skillType
        },
      }),
      invalidatesTags: (result) => 
        result ? [
          { type: 'Student', id: result.id },
          { type: 'Student', id: 'ME' }
        ] : [],
    }),

    deleteSkill: builder.mutation<void, {
      skillId: number;
      skillType: 'DESIRED' | 'OFFERED';
}>({
      query: ({ skillId, skillType }) => ({
        url: `/students/me/skills/${skillId}`,
        method: 'DELETE',
        params: { skillType },
      }),
      invalidatesTags: [{ type: 'Student', id: 'LIST' }],
    }),
  }),
});

export const {
  useLazySearchStudentsQuery,
  useGetStudentByIdQuery,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useAddSkillMutation,
  useDeleteSkillMutation,
} = studentApi;