// scr/features/api/todoApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SearchItem } from "../types/search";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),

  endpoints: (builder) => ({
    getSearchData: builder.query<SearchItem[], void>({
      query: () => `users`,
    }),
    getSearchUserData: builder.query<SearchItem, string>({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useGetSearchDataQuery, useGetSearchUserDataQuery } = searchApi;
