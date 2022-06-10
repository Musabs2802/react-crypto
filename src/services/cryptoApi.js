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
    getCryptos: builder.query({
      query: (maxCount=50) => withHeaders(`/coins?limit=${maxCount}`),
    }),
  }),
})

export const { useGetCryptosQuery } = cryptoApi

// const options = {
//   method: 'GET',
//   url: 'https://coinranking1.p.rapidapi.com/coins',
//   params: {
//     referenceCurrencyUuid: 'yhjMzLPhuIDl',
//     timePeriod: '24h',
//     'tiers[0]': '1',
//     orderBy: 'marketCap',
//     orderDirection: 'desc',
//     limit: '50',
//     offset: '0',
//   },
//   headers: {
//     'X-RapidAPI-Key': '6bc94315f2msh75b857b23f00ce6p19159bjsn0c7aacb8d64e',
//     'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
//   },
// }
