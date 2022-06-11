import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const headers = {
  'X-RapidAPI-Key': process.env.REACT_APP_COIN_API_KEY,
  'X-RapidAPI-Host': process.env.REACT_APP_COIN_RAPIDAPI_HOST,
}

const withHeaders = (url) => ({ url: url, headers: headers })

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_COIN_RAPIDAPI_URL,
  }),
  endpoints: (builder) => ({
    getCoins: builder.query({
      query: (count = 100) => withHeaders(`/coins?limit=${count}`),
    }),
    getCoin: builder.query({
      query: (coinId) => withHeaders(`/coin/${coinId}`),
    }),
  }),
})

export const { useGetCoinsQuery, useGetCoinQuery } = cryptoApi
