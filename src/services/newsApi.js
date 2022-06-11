import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const headers = {
  'X-BingApis-SDK': 'true',
  'X-RapidAPI-Key': process.env.REACT_APP_NEWS_API_KEY,
  'X-RapidAPI-Host': process.env.REACT_APP_NEWS_RAPIDAPI_HOST,
}

const withHeaders = (url) => ({ url: url, headers: headers })

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_NEWS_RAPIDAPI_URL,
  }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ category, count }) =>
        withHeaders(
          `/news/search?q=${category}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
})

export const { useGetNewsQuery } = newsApi
