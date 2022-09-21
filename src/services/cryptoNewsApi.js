import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoNewsApiHeaders ={
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': 'a6107d467amsh0dbe21c17dd43c0p164e6djsna12477fa8354',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const createRequest = (url) => ({url, headers:cryptoNewsApiHeaders })

export const  cryptoNewsApi = createApi({
    reducerPath:'cryptoNewsApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(builder) =>  ({
        getCryptoNews: builder.query({
            query:({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const {
    useGetCryptoNewsQuery 
} = cryptoNewsApi

