import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('username', data.username);
          localStorage.setItem('token', data.token);
        } catch (error) {
          console.error('Mutation failed:', error);
        }
      },
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: 'signup',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // localStorage.setItem('username', data.username);
          // localStorage.setItem('token', data.token);
        } catch (error) {
          console.error('Mutation failed:', error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
