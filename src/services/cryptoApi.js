import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
  'X-RapidAPI-Key': '6bc94315f2msh75b857b23f00ce6p19159bjsn0c7aacb8d64e',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
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