// scr/features/api/todoApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface SearchItem {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),

  endpoints: (builder) => ({
    getSearchData: builder.query<SearchItem[], void>({
      query: () => `users`,
    }),
  }),
});

export const { useGetSearchDataQuery } = searchApi;
