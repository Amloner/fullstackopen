// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/annecdotes' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (id) => `/${id}`,
    }),
    addNewPost: builder.mutation({
      query: ( body ) => (
     
        {
        method: 'POST',
        body
      }),
    }),
    addUpdatepost: builder.mutation({
      query: ( data ) => {
        console.log('test' +data)
        const votes = data.votes +1
        const { id, ...body } = data
        const crow = {...data, votes:  votes}
        console.log('THIS IS OUTPUT  ' + crow.votes)
        console.log('test' + id)
        console.log(body)
        return  {
          url: `/${id}`,
        method: 'PUT',
        body : crow
      }},
    }),
 
  }),
})
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery , useAddNewPostMutation, useAddUpdatepostMutation } = pokemonApi