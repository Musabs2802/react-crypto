import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
  'X-RapidAPI-Key': process.env.REACT_APP_COIN_API_KEY,
  'X-RapidAPI-Host': process.env.REACT_APP_COIN_RAPIDAPI_URL,
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const withHeaders = (url) => ({ url: url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCoins: builder.query({
      query: (maxCount = 50) => withHeaders(`/coins?limit=${maxCount}`),
    }),
    getCoin: builder.query({
      query: (coinId) => withHeaders(`/coin/${coinId}`),
    }),
  }),
})

export const { useGetCoinsQuery, useGetCoinQuery } = cryptoApi
